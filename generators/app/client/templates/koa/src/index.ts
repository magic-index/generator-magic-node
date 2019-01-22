import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as fs from 'fs';
const chalk = require('chalk');
import Cache, { ConfigType } from './util/Cache';
import Elastic from './util/Elastic';
import {AppRoutes} from "./middleware/Routes";
import {scanControllerFiles} from './util/ScanControllerFiles';
import {requestError} from './middleware/RequestError';
import {Eureka} from 'eureka-js-client';
import ImportSampleData from './sample/ImportSampleData';

showLogo();
// create koa app
const app = new Koa();
// 读取配置文件到全局缓存区
const config: ConfigType = Cache.config = JSON.parse(fs.readFileSync('./config.json').toString());
// 扫描加载所有 Action
scanControllerFiles(() => {
  // 初始化 Eureka
  initEureka();
});
// 解析 body 的中间件
app.use(bodyParser());
// 错误拦截的中间件
app.use(requestError());
// 路由解析的中间件
app.use(AppRoutes.router.routes());
app.use(AppRoutes.router.allowedMethods());
app.listen(Cache.config.port);
console.log(`Koa application is up and running on port ${Cache.config.port}`);

// 打开 elastic 连接
if (Cache.config.elastic.enable) {
  Elastic.connect();
  Elastic.client.ping({
    requestTimeout: 3800
  }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Successfully connected elasticsearch.`);
    }
  });
}

// 打开mysql连接
// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {
  console.log(`Successfully connected mysql db.`);
  if (Cache.config.sampleData.enable) {
    await ImportSampleData.run()
  }
  if (Cache.config.elastic.enable) {
    Elastic.client.ping({
      requestTimeout: 3800
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        Elastic.mysqlSyncToElastic();
      }
    });
  }
}).catch(error => console.log('TypeORM connection error: ', error));

function initEureka() {
  if (config.eureka.enable) {
    const client = new Eureka({
      ...config.eureka.parameter,
      requestMiddleware: (requestOpts, done) => {
        requestOpts.auth = config.eureka.auth;
        done(requestOpts);
      }
    });

    client.start(function(error) {
      if(error){
        console.error('Registration eureka failed.');
        console.error(error);
      }else{
        console.log('Registered eureka successfully.');
      }
    });
  }
}

function showLogo() {
  console.log('==========================================================');
  console.log(chalk.magenta('   ▄▄▄▄███▄▄▄▄      ▄████████    ▄██████▄   ▄█   ▄████████ \n' +
    ' ▄██▀▀▀███▀▀▀██▄   ███    ███   ███    ███ ███  ███    ███ \n' +
    ' ███   ███   ███   ███    ███   ███    █▀  ███▌ ███    █▀  \n' +
    ' ███   ███   ███   ███    ███  ▄███        ███▌ ███        \n' +
    ' ███   ███   ███ ▀███████████ ▀▀███ ████▄  ███▌ ███        \n' +
    ' ███   ███   ███   ███    ███   ███    ███ ███  ███    █▄  \n' +
    ' ███   ███   ███   ███    ███   ███    ███ ███  ███    ███ \n' +
    '  ▀█   ███   █▀    ███    █▀    ████████▀  █▀   ████████▀  \n' +
    '                                                           '));
  console.log('==========================================================');
  console.log('Tag: nodejs\nAuthor: snowfox\nEmail: fox@sfxh.cc');
  console.log('==========================================================');
}
