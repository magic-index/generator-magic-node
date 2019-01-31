import { Context } from 'koa';
import { BadRequestAlertException } from '../middleware/RequestError';
import { Brackets, getRepository } from "typeorm";

export function getElasticSearchParams(context: Context) {
  const page = context.request.query.page || 0;
  const size = context.request.query.size || 10;
  return {
    query: context.request.query.query,
    page: page * size,
    size,
    sort: context.request.query.sort
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

export function getSqlSearchPagingParams(context: Context) {
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
