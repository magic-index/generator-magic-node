<h1 align="center">generator-magic-node</h1>
[![NPM version][npm-image]][npm-url]
<a href="https://www.npmjs.com/package/vue" rel="nofollow">
    <img src="https://camo.githubusercontent.com/9a140a4c68e7c178bc660bee7675f4f25ff7ade3/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7675652e737667" alt="License" data-canonical-src="https://img.shields.io/npm/l/vue.svg" style="max-width:100%;">
</a>

# 描述   
一个 node 后端服务生成器，能够生成脚手架和实体类。  
为了保证一套前端项目所需要的后台能在 jhipster 与 nodejs 之间无缝切换，所以接口规范与 jhipster 尽量地保持一致，包括授权与鉴权方式。

# 条件  
1. 依赖 yeoman
```
npm install -g yo
```
2. 实体类生成部分需要使用 [JDL](https://www.jhipster.tech/jdl) 生成出来的 JSON 文件，对 [JDL](https://www.jhipster.tech/jdl) 不熟悉的同学可以到 [jhipster](https://www.jhipster.tech) 官网查找相关文档  
```
npm install -g generator-jhipster
```

# 安装    
```
npm install -g generator-magic-node
```

# 使用  
* 生成脚手架
```
mkdir node-project
cd node-project
yo magic-node
```

* 生成实体类  
1. 在 [jdl-studio](https://start.jhipster.tech/jdl-studio) 编写好数据表结构，并导出到项目根目录，例如我导出的文件是 jhipster-jdl.jh
    ```
        cp jhipster-jdl.jh node-project/jhipster-jdl.jh
        cd node-project
        jhipster import-jdl jhipster-jdl.jh
    ```
    执行成功后，当前项目文件目录下会出现一个 .jhipster 文件夹，里面包含了后续需要使用的数据模型配置文件  

2. 执行命令生成实体类
    ```
    yo magic-node --lang=zh --entity=Region
    ```
    或者
    ```
    yo magic-node
    language[en/zh/ja] en
    What generates? Entity class
    Entity name: Region
    ```

# 目录结构
```
.directory
.gitignore
.jhipster   # 数据模型配置文件
│-- Region.json 
.yo-rc.json
README.md
config.json
ormconfig.json
package.json
src
│-- controller  # 控制层，接口入口
│-- entity  # 实体层，数据模型类位置
│-- index.ts
│-- middleware
│-- migration
│-- sample  # 样本数据，用于在项目启动的时候自动创建模版数据
│-- subscriber
│-- util
tsconfig.json
```

# 接口例子 
* 创建  
    请求：

    ```
    curl --request POST \
    --url http://127.0.0.1:3000/api/regions \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 137cfaa2-bba3-94c6-a73d-858bf899f3c7' \
    --data '{\n	"regionName": "CN"\n}'
    ```
    ```
    POST /api/regions HTTP/1.1
    Host: 127.0.0.1:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: ffe8ff8c-f9e2-60be-dc1a-0f7e5e2b2383

    {
        "regionName": "CN"
    }
    ```
    响应：
    ```
    {
        "regionName": "CN",
        "id": 1
    }
    ```
* 修改  
    请求：
    ```
    curl --request PUT \
    --url http://127.0.0.1:3000/api/regions \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: e4cae952-07bc-0857-73be-9d2099d3954f' \
    --data '{\n	"id": 1,\n	"regionName": "JP"\n}'
    ```
    ```
    PUT /api/regions HTTP/1.1
    Host: 127.0.0.1:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 604881ef-c221-f756-e3c5-6e1e58163b6c

    {
	    "id": 1,
	    "regionName": "JP"
    }
    ```
    响应：
    ```
    {
        "id": 1,
        "regionName": "JP"
    }
    ```
* 删除  
    请求：
    ```
    curl --request DELETE \
    --url http://127.0.0.1:3000/api/regions/1 \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: d0bd6631-b56d-3c14-565a-f1a6d14aba47'
    ```
    ```
    DELETE /api/regions/1 HTTP/1.1
    Host: 127.0.0.1:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 70b023ea-b101-c46e-9240-90f1909c2107
    ```
    响应：
    ```
    {
        "id": "2"
    }
    ```
* 获取  
    请求：
    ```
    curl --request GET \
    --url http://127.0.0.1:3000/api/regions/1 \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 32045bad-4ed5-fbfa-4a7f-9b2686eb3891'
    ```
    ```
    GET /api/regions/1 HTTP/1.1
    Host: 127.0.0.1:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: ca50cf1d-7e72-70a2-37c8-037bfcc5893f

    ```
    响应：
    ```
    {
        "id": 1,
        "regionName": "CN"
    }
    ```
* 查询 (启用ES时)  
    请求：
    ```
    curl --request GET \
    --url 'http://127.0.0.1:3000/api/_search/regions?query=regionName%3AJP&page=0&size=10' \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 12afa220-9d89-6f7c-97b9-1dde9f4c8c85'
    ```
    ```
    GET /api/_search/regions?query=regionName:JP&amp;page=0&amp;size=10 HTTP/1.1
    Host: 127.0.0.1:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 260f20fc-4697-51a1-38cb-ceeb4259ea23
    ```
    响应：
    ```
    [
        {
            "id": 1,
            "regionName": "JP"
        }
    ]
    ```

# 技术栈  

<a href="https://nodejs.org">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/node.png" style="max-width:100px">
</a>
<a href="https://github.com/koajs/koa">
    <img src="https://raw.githubusercontent.com/koajs/koa/HEAD/docs/logo.png" style="max-width:100px">
</a>
<a href="https://www.tslang.cn">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/typescript.png" style="max-width:100px">
</a>
<a href="http://typeorm.io">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/typeorm.png" style="max-width:100px; background-color: #FFFFFF;">
</a>
<a href="https://www.mysql.com">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/mysql.png" style="max-width:100px; background-color: #FFFFFF;">
</a>
<a href="https://www.elastic.co">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/elastic.png" style="max-width:100px; background-color: #FFFFFF;">
</a>
<a href="https://yeoman.io">
    <img src="
https://open-source-project.oss-cn-shenzhen.aliyuncs.com/logos/yeoman.png" style="max-width:100px">
</a>

# License  
MIT © [snowfox](https://github.com/little-snow-fox)