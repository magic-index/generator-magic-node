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
// Create koa app
// 创建 koa 应用
const app = new Koa();
// Read the configuration file into the global cache
// 读取配置文件到全局缓存区
const config: ConfigType = Cache.config = JSON.parse(fs.readFileSync('./config.json').toString());
// Scan and load all actions
// 扫描加载所有 Action
scanControllerFiles(() => {
  // Initialize the Eureka
  // 初始化 Eureka
  initEureka();
});
// Middleware that parses the body
// 解析 body 的中间件
app.use(bodyParser());
// Intercepting the wrong middleware
// 拦截错误的中间件
app.use(requestError());
// Middleware that handles routing
// 路由解析的中间件
app.use(AppRoutes.router.routes());
app.use(AppRoutes.router.allowedMethods());
app.listen(Cache.config.port);
console.log(`Koa application is up and running on port ${Cache.config.port}`);

// Open elastic search connection
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

// create connection with mysql database
// 打开mysql连接
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
