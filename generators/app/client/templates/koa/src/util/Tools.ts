import { Context } from 'koa';
import { BadRequestAlertException } from '../middleware/RequestError';
import {Brackets, Equal, getRepository, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual} from "typeorm";

export function getElasticSearchParams(context: Context, filter?: Array<Object>) {
  const page = context.request.query.page || 0;
  const size = context.request.query.size || 10;
  return {
    query: context.request.query.query,
    page: page * size,
    size,
    sort: context.request.query.sort,
    filter: filter
  }
}

export function setElasticSearchPagingHeader(context: Context, res: any) {
  context.response.set('X-Total-Count', res.count);
  context.response.set('X-Page', context.request.query.page);
  context.response.set('X-Size', res.size);
}

export function setSqlSearchPagingHeader(context: Context, count: number) {
  context.response.set('X-Total-Count', count.toString());
  context.response.set('X-Page', context.request.query.page || 0);
  context.response.set('X-Size', context.request.query.size || 10);
}

export function getSqlSearchPagingParams(context: Context): { page: number, size: number, sort: Array<any>} {
  const page = context.request.query.page || 0;
  const size = context.request.query.size || 10;
  const sort: string[] | string = context.request.query.sort;
  const sortList: { field: string, value: "ASC" | "DESC" }[] = [];
  if (sort) {
    const inputSortList: string[] = typeof sort === 'object' ? sort : [sort];
    inputSortList.forEach(item => {
      const strArray = item.split(',');
      if (strArray.length === 2) {
        const sortObject = {
          field: strArray[0],
          value: <"ASC" | "DESC"> strArray[1]
        };
        sortList.push(sortObject);
      }
    });
  }
  return {
    page: page * size,
    size,
    sort: sortList
  }
}

export function deleteSuccessfulResponse(context: Context, id?: any) {
  context.body = {
    id
  };
}

export function getRequestParamId(context: Context) {
  if (!context.params.id) {
    throw new BadRequestAlertException('Can\'t find the id');
  }
  return context.params.id;
}

/**
 * 解析前端传过来的 mysql 查询条件，构建一个用于查询的 QueryBuilder 对象
 * @param entity 实体名，例如 Demo
 * @param queryParams 查询参数
 * @param fields 实体里面存在的字段
 * @param alias 表的别名
 */
export function getSearchSqlQueryBuilder(entity, queryParams: Object, fields: string[], alias?: string) {
  const repository = getRepository(entity).createQueryBuilder(alias);
  if (queryParams) {
    const keys = Object.keys(queryParams);
    keys.forEach(key => {
      const strArray = key.split('.');
      if (strArray.length === 2 && strArray[1] != null && queryParams[key] != null && fields.indexOf(strArray[0]) > -1) {
        const fieldName = strArray[0];
        const parameterName = fieldName + '_' + strArray[1];
        const value = queryParams[key];
        const aliasValue = alias ? alias + '.' : '';
        repository.where('1 = 1');
        switch (strArray[1]) {
          case 'equals':
            repository.andWhere(`${aliasValue}${fieldName} = :${parameterName}`).setParameter(parameterName, value);
            break;
          case 'contains':
            repository.andWhere(`${aliasValue}${fieldName} like :${parameterName}`).setParameter(parameterName, `%${value}%`);
            break;
          case 'greaterOrEqualThan':
            repository.andWhere(`${aliasValue}${fieldName} >= :${parameterName}`).setParameter(parameterName, value);
            break;
          case 'greaterThan':
            repository.andWhere(`${aliasValue}${fieldName} > :${parameterName}`).setParameter(parameterName, value);
            break;
          case 'lessOrEqualThan':
            repository.andWhere(`${aliasValue}${fieldName} <= :${parameterName}`).setParameter(parameterName, value);
            break;
          case 'lessThan':
            repository.andWhere(`${aliasValue}${fieldName} < :${parameterName}`).setParameter(parameterName, value);
            break;
          case 'in':
            const values = value.split(',');
            if (values.length > 0) {
              repository.andWhere(new Brackets(qb => {
                values.forEach((val, index) => {
                  qb.orWhere(`${aliasValue}${fieldName} = :${parameterName}_${index}`);
                });
              }));
              values.forEach((val, index) => {
                repository.setParameter(parameterName + '_' + index, val);
              });
            }
            break;
          case 'specified':
            repository.andWhere(`${aliasValue}${fieldName} = :${parameterName}`).setParameter(parameterName, value === true ? 1 : 0);
            break;
          default:
            break;
        }
      }
    });
  }
  return repository;
}

/**
 * 对 getRawMany 出来的原始数据进行格式转换，例如 TestDemo_id, TestDemo_name 转为 id, name
 * @param sourceList
 * @param name 表名, 例如 TestDemo
 */
export function mysqlRawManyDataFormat(sourceList: Array<Object>, name: String) {
  const list = [];
  const start = name.length + 1;
  if (sourceList != null && sourceList.length > 0) {
    const keys = Object.keys(sourceList[0]);
    const fields = [];
    keys.forEach(key => {
      fields.push(key.substr(start));
    });
    sourceList.forEach(item => {
      const data = {};
      fields.forEach((field, index) => {
        data[field] = item[keys[index]];
      });
      list.push(data);
    });
  }
  return list;
}

/**
 * 把前端传过来的搜索语句转换为 Repository 的搜索条件对象
 * @param queryParams
 * @param fields
 */
export function createSearchSqlRepositoryBody(queryParams: Object, fields?: Array<string>): any {
  const condition = {}
  if (queryParams) {
    const keys = Object.keys(queryParams);
    keys.forEach(key => {
      const strArray = key.split('.');
      if (strArray.length === 2 && strArray[1] != null && queryParams[key] != null && fields.indexOf(strArray[0]) > -1) {
        const fieldName = strArray[0];
        // const parameterName = fieldName + '_' + strArray[1];
        const value = queryParams[key];
        if (fields == null || fields.indexOf(fieldName) > -1) {
          switch (strArray[1]) {
            case 'equals':
              condition[fieldName] = Equal(value);
              break;
            case 'contains':
              condition[fieldName] = Like(`%${value}%`);
              break;
            case 'greaterOrEqualThan':
              condition[fieldName] = MoreThanOrEqual(value);
              break;
            case 'greaterThan':
              condition[fieldName] = MoreThan(value);
              break;
            case 'lessOrEqualThan':
              condition[fieldName] = LessThanOrEqual(value);
              break;
            case 'lessThan':
              condition[fieldName] = LessThan(value);
              break;
            case 'in':
              const values = value.split(',');
              if (values.length > 0) {
                condition[fieldName] = In(values);
              }
              break;
            case 'specified':
              condition[fieldName] = Equal(value === true ? 1 : 0);
              break;
            default:
              break;
          }
        }
      }
    });
  }
  return condition;
}

/**
 * 把分页信息和排序信息赋值到条件对象里
 * @param condition
 * @param pagingParams
 */
export function setRepositoryPagingParams(condition: any, pagingParams: { page: number, size: number, sort: Array<any>}) {
  condition.skip = pagingParams.page;
  condition.take = pagingParams.size;
  if (pagingParams.sort != null && pagingParams.sort.length > 0) {
    const sortMap: any = {}
    pagingParams.sort.forEach(item => {
      sortMap[item.field] = item.value
    });
    condition.order = sortMap;
  }
  return condition
}
