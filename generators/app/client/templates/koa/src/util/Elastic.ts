import * as elasticsearch from 'elasticsearch';
import Cache from './Cache';
import {getConnection} from "typeorm";

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
    try {
      await this.client.deleteByQuery({
        index: connect.options.database,
        q: '*:*'
      });
    } catch (e) {

    }

    await connect.entityMetadatas.forEach(async (item) => {
       if (item.tableType === 'regular') {
         const list = await connect.query(`select * from \`${item.tableName}\``);
         list.forEach((data: any) => {
           if (data.id) {
             this.client.create({
               index: connect.options.database,
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
  static async syncCreate(id, tableName) {
    const connect = getConnection();
    const data: any = (await connect.query(`select * from \`${tableName}\` where id = ${id}`))[0];
    return await this.client.create({
      index: connect.options.database,
      type: tableName,
      id: data.id,
      body: data
    });
  }
  static async syncUpdate(id, tableName) {
    const connect = getConnection();
    const data: any = (await connect.query(`select * from \`${tableName}\` where id = ${id}`))[0];
    return await this.client.update({
      index: connect.options.database,
      type: tableName,
      id: data.id,
      body: {
        doc: data
      }
    });
  }
  static async syncDelete(id, tableName) {
    const connect = getConnection();
    return await this.client.delete({
      index: connect.options.database,
      type: tableName,
      id: id
    });
  }
  static async search(param: { query: string, page: number, size: number, sort: any }, tableName) {
    const connect = getConnection();
    const options = {
      index: connect.options.database,
      type: tableName,
      q: param.query,
      from: param.page,
      size: param.size,
      sort: param.sort
    };
    const res = await this.client.search(options);
    const data = [];
    res.hits.hits.forEach((item) => {
      data.push(item._source);
    });
    const count = await this.client.count(options);
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
  //     this.index = connect.options.database.toString();
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
