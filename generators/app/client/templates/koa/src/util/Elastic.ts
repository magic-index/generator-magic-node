import * as elasticsearch from 'elasticsearch';
import Cache from './Cache';
import {getConnection} from "typeorm";
import Mapping from './../mapping';

export default class Elastic {
  static client: Client;
  static connect() {
    this.client = new elasticsearch.Client({
      host: `${Cache.config.elastic.host}:${Cache.config.elastic.port}`,
      log: Cache.config.elastic.log // trace
    });
  };
  static async mysqlSyncToElastic() {
    console.log('Start synchronizing mysql data to elasticsearch.');
    const connect = getConnection();
    await this.client.indices.delete({
      index: '_all'
    });

    await connect.entityMetadatas.forEach(async (item) => {
       if (item.tableType === 'regular') {
         await this.client.indices.create({
           index: item.tableName
         });
         // 解析 mapping 目录下的所有 ES 映射，相当于 mysql 建表过程，提前定义好 ES 的表字段类型
         const mapping = Mapping[item.name + 'Mapping']
         if (mapping != null) {
           try {
             await this.client.indices.putMapping({
               index: item.tableName,
               type: item.tableName,
               body: mapping
             });
           } catch (e) {
             console.error(`error mapping file: ${item.name + 'Mapping'}`)
             throw e
           }
         }
         const list = await connect.query(`select * from \`${item.tableName}\``);
         list.forEach((data: any) => {
           if (data.id) {
             this.client.create({
               index: item.tableName,
               type: item.tableName,
               id: data.id,
               body: data,
               refresh: false
             });
           }
         });
       }
    });
  }
  /**
   * 把新建的 mysql 数据同步到 es
   * @param sourceData 源数据或者唯一值
   * @param tableName mysql 表名
   * @param key 唯一值对应的变量名，默认为 id
   */
  static async syncCreate(sourceData: string | number | Object, tableName: string, key: string = 'id') {
    const connect = getConnection();
    const data: any = typeof sourceData === 'object' ? sourceData : (await connect.query(`select * from \`${tableName}\` where ${key} = ${sourceData}`))[0];
    return await this.client.create({
      index: tableName,
      type: tableName,
      id: data[key],
      body: data,
      refresh: true
    });
  }

  /**
   * 把更新后的 mysql 数据同步到 es
   * @param sourceData 源数据或者唯一值
   * @param tableName mysql 表名
   * @param key 唯一值对应的变量名，默认为 id
   */
  static async syncUpdate(sourceData: string | number | Object, tableName: string, key: string = 'id') {
    const connect = getConnection();
    const data: any = typeof sourceData === 'object' ? sourceData : (await connect.query(`select * from \`${tableName}\` where ${key} = ${sourceData}`))[0];
    return await this.client.update({
      index: tableName,
      type: tableName,
      id: data[key],
      refresh: true,
      body: {
        doc: data
      }
    });
  }
  static async syncDelete(id: string | number, tableName: string) {
    const connect = getConnection();
    return await this.client.delete({
      index: tableName,
      type: tableName,
      refresh: true,
      id: id
    });
  }
  static async search(param: { query: string, page: number, size: number, sort: any, filter?: Array<Object> }, tableName: string) {
    const connect = getConnection();
    const options = {
      index: tableName,
      q: null,
      from: param.page,
      size: param.size,
      sort: param.sort != null ? param.sort.split(',') : null,
      body: null
    };
    if (param.filter == null) {
      options.q = param.query;
    } else {
      options.body = {
        query: {
          bool: {
            must: {
              query_string: {
                query: param.query,
              }
            },
            filter: param.filter
          }
        }
      };
    }
    const res = await this.client.search(options);
    const data = [];
    res.hits.hits.forEach((item) => {
      data.push(item._source);
    });
    const count = await this.client.count({
      index: tableName,
      type: tableName,
      q: param.query
    });
    return {
      data,
      page: options.from,
      size: options.size,
      sort: options.sort,
      count: count.count
    };
  }
  // private static checkIndex() {
  //   if (!this.index) {
  //     const connect = getConnection();
  //     this.index = tableName.toString();
  //   }
  // }
}

interface Client {
  ping(options: { requestTimeout: Number }, callback?: (error) => any),
  search(options: {
    index: string,
    type: string,
    body: {}
  }),
  bulk(options: any, callback: (err, resp) => any),
  clearScroll(options: any, callback?: Function),
  count(options: any),
  create(options: any, callback?: Function),
  delete(options: any, callback?: Function),
  deleteByQuery(options: any, callback?: Function),
  deleteScript(options: any, callback?: Function),
  exists(options: any, callback?: Function),
  existsSource(options: any, callback?: Function),
  explain(options: any, callback?: Function),
  fieldCaps(options: any, callback?: Function),
  get(options: any, callback?: Function),
  getScript(options: any, callback?: Function),
  index(options: any, callback?: Function),
  info(options: any, callback?: Function),
  mget(options: any, callback?: Function),
  msearch(options: any, callback?: Function),
  msearchTemplate(options: any, callback?: Function),
  mtermvectors(options: any, callback?: Function),
  putScript(options: any, callback?: Function),
  rankEval(options: any, callback?: Function),
  reindex(options: any, callback?: Function),
  reindexRethrottle(options: any, callback?: Function),
  renderSearchTemplate(options: any, callback?: Function),
  scriptsPainlessExecute(options: any, callback?: Function),
  reindex(options: any, callback?: Function),
  scroll(options: any, callback?: Function),
  search(options: any, callback?: Function),
  searchShards(options: any, callback?: Function),
  searchTemplate(options: any, callback?: Function),
  termvectors(options: any, callback?: Function),
  update(options: any, callback?: Function),
  updateByQuery(options: any, callback?: Function),
  cat: {
    aliases(options: any, callback?: Function),
    allocation(options: any, callback?: Function),
    count(options: any, callback?: Function),
    fielddata(options: any, callback?: Function),
    health(options: any, callback?: Function),
    help(options: any, callback?: Function),
    indices(options: any, callback?: Function),
    master(options: any, callback?: Function),
    nodeattrs(options: any, callback?: Function),
    nodes(options: any, callback?: Function),
    pendingTasks(options: any, callback?: Function),
    plugins(options: any, callback?: Function),
    recovery(options: any, callback?: Function),
    repositories(options: any, callback?: Function),
    segments(options: any, callback?: Function),
    shards(options: any, callback?: Function),
    snapshots(options: any, callback?: Function),
    tasks(options: any, callback?: Function),
    templates(options: any, callback?: Function),
    threadPool(options: any, callback?: Function)
  },
  cluster: {
    allocationExplain(options: any, callback?: Function),
    getSettings(options: any, callback?: Function),
    health(options: any, callback?: Function),
    pendingTasks(options: any, callback?: Function),
    putSettings(options: any, callback?: Function),
    remoteInfo(options: any, callback?: Function),
    reroute(options: any, callback?: Function),
    state(options: any, callback?: Function),
    stats(options: any, callback?: Function)
  },
  indices: {
    analyze(options: any, callback?: Function),
    clearCache(options: any, callback?: Function),
    close(options: any, callback?: Function),
    create(options: any, callback?: Function),
    delete(options: any, callback?: Function),
    deleteAlias(options: any, callback?: Function),
    deleteTemplate(options: any, callback?: Function),
    exists(options: any, callback?: Function),
    existsAlias(options: any, callback?: Function),
    existsTemplate(options: any, callback?: Function),
    existsType(options: any, callback?: Function),
    flush(options: any, callback?: Function),
    flushSynced(options: any, callback?: Function),
    forcemerge(options: any, callback?: Function),
    get(options: any, callback?: Function),
    getAlias(options: any, callback?: Function),
    getFieldMapping(options: any, callback?: Function),
    getMapping(options: any, callback?: Function),
    getSettings(options: any, callback?: Function),
    getTemplate(options: any, callback?: Function),
    getUpgrade(options: any, callback?: Function),
    open(options: any, callback?: Function),
    putAlias(options: any, callback?: Function),
    putMapping(options: any, callback?: Function),
    putSettings(options: any, callback?: Function),
    putTemplate(options: any, callback?: Function),
    recovery(options: any, callback?: Function),
    refresh(options: any, callback?: Function),
    rollover(options: any, callback?: Function),
    segments(options: any, callback?: Function),
    shardStores(options: any, callback?: Function),
    shrink(options: any, callback?: Function),
    split(options: any, callback?: Function),
    stats(options: any, callback?: Function),
    updateAliases(options: any, callback?: Function),
    upgrade(options: any, callback?: Function),
    validateQuery(options: any, callback?: Function),
    deletePipeline(options: any, callback?: Function),
    getPipeline(options: any, callback?: Function),
    processorGrok(options: any, callback?: Function),
    putPipeline(options: any, callback?: Function),
    simulate(options: any, callback?: Function)
  },
  nodes: {
    info(options: any, callback?: Function),
    stats(options: any, callback?: Function),
    usage(options: any, callback?: Function)
  },
  snapshot: {
    createRepository(options: any, callback?: Function),
    delete(options: any, callback?: Function),
    deleteRepository(options: any, callback?: Function),
    get(options: any, callback?: Function),
    getRepository(options: any, callback?: Function),
    restore(options: any, callback?: Function),
    status(options: any, callback?: Function),
    verifyRepository(options: any, callback?: Function)
  },
  tasks: {
    cancel(options: any, callback?: Function),
    get(options: any, callback?: Function),
    list(options: any, callback?: Function)
  }
}
