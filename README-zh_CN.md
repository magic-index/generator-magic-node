<h1 align="center">generator-magic-node</h1>
<p align="center">
    <a href="https://opensource.org/licenses/MIT"     rel="nofollow">
        <img src="https://camo.githubusercontent.com/9a140a4c68e7c178bc660bee7675f4f25ff7ade3/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7675652e737667" alt="License" data-canonical-src="https://img.shields.io/npm/l/vue.svg" style="max-width:100%;">
    </a>
    <a href="https://www.npmjs.com/package/generator-magic-node"     rel="nofollow">
        <img src="https://img.shields.io/npm/v/generator-magic-node.svg" alt="npm" data-canonical-src="https://img.shields.io/npm/v/generator-magic-node.svg" style="max-width:100%;">
    </a>
    <a href="ttps://github.com/little-snow-fox/generator-magic-node/blob/master/README.md"     rel="nofollow">
        <img src="https://camo.githubusercontent.com/de158aa34a13afbb30d42288888cf9aa1d29a9d7/68747470733a2f2f696d672e736869656c64732e696f2f6769747465722f726f6f6d2f616e742d64657369676e2f616e742d64657369676e2d656e676c6973682e7376673f7374796c653d666c61742d737175617265266c6f676f57696474683d3230266c6f676f3d64617461253341696d616765253246737667253242786d6c2533426261736536342532435044393462577767646d567963326c76626a30694d5334774969426c626d4e765a476c755a7a3069565652474c546769507a344e436a787a646d636765473173626e4d39496d6830644841364c79393364336375647a4d7562334a6e4c7a49774d44417663335a6e4969423462577875637a703462476c75617a30696148523063446f764c336433647935334d793576636d63764d546b354f53393462476c756179496764326c6b64476739496a45794d7a55694947686c6157646f644430694e6a55774969423261575633516d393450534977494441674e7a51784d43417a4f544177496a344e436a78795a574e30494864705a48526f505349334e4445774969426f5a576c6e61485139496a4d354d44416949475a706247773949694e694d6a49794d7a51694c7a344e436a78775958526f49475139496b30774c4451314d4567334e444577625441734e6a4177534442744d4377324d4442494e7a51784d4730774c4459774d456777625441734e6a4177534463304d5442744d4377324d4442494d434967633352796232746c5053496a5a6d5a6d4969427a64484a766132557464326c6b64476739496a4d774d4349765067304b50484a6c5933516764326c6b64476739496a49354e6a51694947686c6157646f644430694d6a45774d4349675a6d6c7362443069497a4e6a4d3249325a5349765067304b504763675a6d6c736244306949325a6d5a694925324244516f385a7942705a443069637a4534496a344e436a786e49476c6b50534a7a4f534925324244516f385a7942705a443069637a55695067304b5047636761575139496e4d30496a344e436a78775958526f49476c6b50534a7a4969426b50534a4e4d6a51334c446b7749444d784e7934314d7a51794d7a41734d7a41334c6a41344d6a417a4f5341784d7a49754f44637a4d6a45344c4445334d6934354d5463354e6a46494d7a59784c6a45794e6a63344d6b77784e7a59754e4459314e7a63774c444d774e7934774f4449774d7a6c3649693825324244516f3864584e6c49486873615735724f6d68795a57593949694e7a49694235505349304d6a41694c7a344e436a78316332556765477870626d733661484a6c5a6a306949334d6949486b39496a67304d4349765067304b5048567a5a53423462476c75617a706f636d566d5053496a63794967655430694d5449324d4349765067304b5043396e5067304b5048567a5a53423462476c75617a706f636d566d5053496a63794967655430694d5459344d4349765067304b5043396e5067304b5048567a5a53423462476c75617a706f636d566d5053496a637a516949486739496a49304e794967655430694d6a457749693825324244516f384c326325324244516f3864584e6c49486873615735724f6d68795a57593949694e7a4f534967654430694e446b3049693825324244516f384c326325324244516f3864584e6c49486873615735724f6d68795a57593949694e7a4d54676949486739496a6b344f4349765067304b5048567a5a53423462476c75617a706f636d566d5053496a637a6b6949486739496a45354e7a59694c7a344e436a78316332556765477870626d733661484a6c5a6a306949334d3149694234505349794e44637749693825324244516f384c326325324244516f384c334e325a7a34253344" alt="Gitter" data-canonical-src="https://img.shields.io/gitter/room/ant-design/ant-design-english.svg?style=flat-square&amp;logoWidth=20&amp;logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D" style="max-width:100%;">
    </a>
    <a href="https://github.com/little-snow-fox/generator-magic-node/blob/master/README-zh_CN.md"     rel="nofollow">
        <img src="https://camo.githubusercontent.com/73aaab2084d86ec4b409c7824ec10a617a543bd6/68747470733a2f2f696d672e736869656c64732e696f2f6769747465722f726f6f6d2f616e742d64657369676e2f616e742d64657369676e2e7376673f7374796c653d666c61742d737175617265266c6f676f57696474683d3230266c6f676f3d64617461253341696d616765253246737667253242786d6c2533426261736536342532435044393462577767646d567963326c76626a30694d5334774969426c626d4e765a476c755a7a3069565652474c546769507a344e436a787a646d636765473173626e4d39496d6830644841364c79393364336375647a4d7562334a6e4c7a49774d44417663335a6e4969423462577875637a703462476c75617a30696148523063446f764c336433647935334d793576636d63764d546b354f53393462476c756179496764326c6b64476739496a6b774d434967614756705a326830505349324d44416949485a705a58644362336739496a41674d43417a4d4341794d434925324244516f385a47566d637a344e436a78775958526f49476c6b50534a7a4969426b50534a4e4d4377744d5341774c6a55344e7a63344e5377774c6a67774f5441784e7941744d4334354e5445774e5463734c5441754d7a41354d444533534441754f5455784d445533544330774c6a55344e7a63344e5377774c6a67774f5441784e336f6949475a706247773949694e6d5a6d526c4d4441694c7a344e436a77765a47566d637a344e436a78795a574e30494864705a48526f5053497a4d434967614756705a326830505349794d4349675a6d6c73624430694932526c4d6a6b784d4349765067304b5048567a5a53423462476c75617a706f636d566d5053496a6379496764484a68626e4e6d62334a7450534a30636d4675633278686447556f4e5377314b53427a593246735a53677a4b5349765067304b5048567a5a53423462476c75617a706f636d566d5053496a6379496764484a68626e4e6d62334a7450534a30636d4675633278686447556f4d5441734d696b67636d39305958526c4b44497a4c6a417a4e6a49304d796b694c7a344e436a78316332556765477870626d733661484a6c5a6a306949334d69494852795957357a5a6d39796254306964484a68626e4e735958526c4b4445794c44517049484a76644746305a5367304e5334344e6a6b344f54677049693825324244516f3864584e6c49486873615735724f6d68795a57593949694e7a49694230636d467563325a76636d3039496e52795957357a624746305a5367784d6977334b534279623352686447556f4e6a6b754f5451314d7a6b324b5349765067304b5048567a5a53423462476c75617a706f636d566d5053496a6379496764484a68626e4e6d62334a7450534a30636d4675633278686447556f4d5441734f536b67636d39305958526c4b4449774c6a59314f5467774f436b694c7a344e436a777663335a6e5067253344253344" alt="Join the chat at https://gitter.im/ant-design/ant-design" data-canonical-src="https://img.shields.io/gitter/room/ant-design/ant-design.svg?style=flat-square&amp;logoWidth=20&amp;logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiw3KSByb3RhdGUoNjkuOTQ1Mzk2KSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsOSkgcm90YXRlKDIwLjY1OTgwOCkiLz4NCjwvc3ZnPg%3D%3D" style="max-width:100%;">
    </a>
</p>
<div align="center">
    <a href="./README.md">English</a> | 简体中文
</div>

# 描述   
一个 node 后端服务生成器，能够生成脚手架和实体类。  
为了保证一套前端项目所需要的后台能在 jhipster 与 nodejs 之间无缝切换，所以接口规范与 jhipster 尽量地保持一致，包括授权与鉴权方式。

# 条件  
1. 依赖 yeoman
```
npm install -g yo
```
2. 实体类生成部分需要使用 [JDL](https://www.jhipster.tech/jdl) 生成出来的 JSON 文件，对 [JDL](https://www.jhipster.tech/jdl) 不熟悉的同学可以到 [jhipster](https://www.jhipster.tech) 官网查找相关文档  
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
    1. 请到 [jdl-studio](https://start.jhipster.tech/jdl-studio) 编写好数据表结构，并导出到项目根目录，例如我导出的文件是 jhipster-jdl.jh
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
    3. 运行项目
        ```
        npm install tsc -g
        npm install
        npm run start
        ```

* 实体配置文件模板  

    .jhipster/Region.json
    ```
    {
      "javadoc": "区域",
      "name": "Region",
      "fields": [
        {
          "javadoc": "名称",
          "fieldName": "name",
          "fieldType": "String",
          "fieldValidateRules": [
            "required",
            "maxlength"
          ],
          "fieldValidateRulesMaxlength": 64
        },
        {
          "javadoc": "创建时间",
          "fieldName": "createTime",
          "fieldType": "Instant",
          "fieldValidateRules": ["required"]
        },
        {
          "javadoc": "修改时间",
          "fieldName": "updateTime",
          "fieldType": "Instant",
          "fieldValidateRules": ["required"]
        },
        {
          "javadoc": "是否可见",
          "fieldName": "isVisible",
          "fieldType": "Boolean",
          "fieldValidateRules": ["required"]
        },
        {
          "javadoc": "是否删除",
          "fieldName": "isDelete",
          "fieldType": "Boolean",
          "fieldValidateRules": ["required"]
        }
      ],
      "relationships": [],
      "changelogDate": "20190706100248",
      "entityTableName": "region",
      "dto": "mapstruct",
      "pagination": "pagination",
      "service": "serviceImpl",
      "jpaMetamodelFiltering": true,
      "fluentMethods": true,
      "clientRootFolder": "",
      "applications": "*"
    }
    ```

# 目录结构
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
│-- enum  # 枚举对象
│-- index.ts
│-- middleware
│-- migration
│-- sample  # 样本数据，用于在项目启动的时候自动创建模版数据
│-- subscriber
│-- util
tsconfig.json
```
# 生成出来的控制层例子
```
import { Context } from 'koa';
import { getManager } from 'typeorm';
import Region from '../entity/Region';
import { validate } from 'class-validator';
import Elastic from '../util/Elastic';
import { setRoute, RequestMethod } from '../middleware/Routes';
import { getElasticSearchParams, setElasticSearchPagingHeader, deleteSuccessfulResponse, getRequestParamId } from '../util/Tools';
import { BadRequestAlertException, NotFoundAlertException } from '../middleware/RequestError';

export default class RegionAction {
  /**
   * get
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/regions/:id')
  async getRegion(context: Context, decoded?: any) {
    const id = getRequestParamId(context);
    const regionRepository = getManager().getRepository(Region);
    const region: Region = await regionRepository.findOne(id);
    if (region) {
      context.body = region;
    } else {
      throw new NotFoundAlertException();
    }
  }
  /**
   * post
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/regions', RequestMethod.POST)
  async createRegion(context: Context, decoded?: any) {
    const regionRepository = getManager().getRepository(Region);
    let region: Region = regionRepository.create(<Region>{
      ...context.request.body
    });
    const errors = await validate(region);
    if (errors.length > 0) {
      throw new BadRequestAlertException(null, errors);
    } else {
      await getManager().save(region);
      region = await regionRepository.findOne(region.id);
      await Elastic.syncCreate(region, regionRepository.metadata.tableName);
      context.body = region;
    }
  }
  /**
   * put
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/regions', RequestMethod.PUT)
  async updateRegion(context: Context, decoded?: any) {
    const regionRepository = getManager().getRepository(Region);
    let region: Region = regionRepository.create(<Region>{
      ...context.request.body
    });
    const errors = await validate(region);
    if (errors.length > 0) {
      throw new BadRequestAlertException(null, errors);
    } else {
      await regionRepository.update(region.id, region);
      region = await regionRepository.findOne(region.id);
      await Elastic.syncUpdate(region, regionRepository.metadata.tableName);
      context.body = region;
    }
  }
  /**
   * delete
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/regions/:id', RequestMethod.DELETE)
  async deleteRegion(context: Context, decoded?: any) {
    const id = getRequestParamId(context);
    const regionRepository = getManager().getRepository(Region);
    await regionRepository.delete(id);
    await Elastic.syncDelete(id, regionRepository.metadata.tableName);
    deleteSuccessfulResponse(context, id)
  }
  /**
   * find
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/regions')
  async findRegion(context: Context, decoded?: DecodedUserInfo) {
    const fields = [
      'id',
      'name'
    ];
    const regionRepository = getManager().getRepository(Region);
    const condition: any = {
      where: createSearchSqlRepositoryBody(context.request.query, fields)
    };
    const count = await regionRepository.count(condition);
    setRepositoryPagingParams(condition, getSqlSearchPagingParams(context));
    const list = await regionRepository.find(condition);
    setSqlSearchPagingHeader(context, count);
    context.body = list;
  }
  /**
   * search
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/_search/regions')
  async searchRegion(context: Context, decoded?: any) {
    const res: any = await Elastic.search(getElasticSearchParams(context), 'region');
    setElasticSearchPagingHeader(context, res);
    context.body = res.data;
  }
}

``` 

# 接口例子 
* 创建  
    请求：

    ```
    curl --request POST \
    --url http://localhost:3000/api/regions \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 137cfaa2-bba3-94c6-a73d-858bf899f3c7' \
    --data '{\n	"name": "CN"\n}'
    ```
    ```
    POST /api/regions HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: ffe8ff8c-f9e2-60be-dc1a-0f7e5e2b2383

    {
        "name": "CN"
    }
    ```
    响应：
    ```
    {
        "name": "CN",
        "id": 1
    }
    ```
* 修改  
    请求：
    ```
    curl --request PUT \
    --url http://localhost:3000/api/regions \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: e4cae952-07bc-0857-73be-9d2099d3954f' \
    --data '{\n	"id": 1,\n	"name": "JP"\n}'
    ```
    ```
    PUT /api/regions HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 604881ef-c221-f756-e3c5-6e1e58163b6c

    {
	    "id": 1,
	    "name": "JP"
    }
    ```
    响应：
    ```
    {
        "id": 1,
        "name": "JP"
    }
    ```
* 删除  
    请求：
    ```
    curl --request DELETE \
    --url http://localhost:3000/api/regions/1 \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: d0bd6631-b56d-3c14-565a-f1a6d14aba47'
    ```
    ```
    DELETE /api/regions/1 HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 70b023ea-b101-c46e-9240-90f1909c2107
    ```
    响应：
    ```
    {
        "id": "1"
    }
    ```
* 获取  
    请求：
    ```
    curl --request GET \
    --url http://localhost:3000/api/regions/1 \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 32045bad-4ed5-fbfa-4a7f-9b2686eb3891'
    ```
    ```
    GET /api/regions/1 HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: ca50cf1d-7e72-70a2-37c8-037bfcc5893f

    ```
    响应：  
    ```
    {
        "id": 1,
        "name": "CN"
    }
    ```
* 查询 (使用 Elasticsearch 的时候)  
    参数：  
    * query: 查询语句，详情请到 [elastic](https://www.elastic.co) 查找相关文档  
    * page: 页数，从 0 开始，默认 0 
    * size: 每页大小，默认 10  
    * sort: 排序，详细用法请参见 elastic 文档

    请求：
    ```
    curl --request GET \
    --url 'http://localhost:3000/api/_search/regions?query=name%3ACN&page=0&size=10' \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 12afa220-9d89-6f7c-97b9-1dde9f4c8c85'
    ```
    ```
    GET /api/_search/regions?query=name:CN&amp;page=0&amp;size=10 HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 260f20fc-4697-51a1-38cb-ceeb4259ea23
    ```
    响应：  
    header  
    ```
    x-page: 0
    x-size: 10
    x-total-count: 1
    ```
    body  
    ```
    [
        {
            "id": 1,
            "name": "CN"
        }
    ]
    ```
* 查询 (使用 Mysql 的时候)  
    参数：  
    * *.equals: 条件，全等判断，例如：name.equals=CN
    * *.contains: 条件，包含判断
    * *.in: 条件，数组包含判断，例如：id.in=1,2,3  
    * *.specified: 条件，真假判断，例如：name.specified=true
    * *.greaterOrEqualThan: 条件，大于等于，例如：id.greaterOrEqualThan=2  
    * *.greaterThan: 条件，大于
    * *.lessOrEqualThan: 条件，小于等于
    * *.lessThan: 条件，小于
    * page: 页数，从 0 开始，默认 0 
    * size: 每页大小，默认 10  
    * sort: 排序，例如：sort=id,DESC&sort=name,ASC

    请求：
    ```
    curl --request GET \
    --url 'http://localhost:3000/api/_search/regions?name.equals=CN&sort=id%2CDESC&page=0&size=10' \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: 2bee9d1e-d406-a8fc-47fb-01f0cd5a661a'
    ```
    ```
    GET /api/_search/regions?name.equals=CN&amp;sort=id,DESC&amp;page=0&amp;size=10 HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 88a2fc33-7d21-7395-ee59-d09c2399c571
    ```
    响应：  
    header  
    ```
    x-page: 0
    x-size: 10
    x-total-count: 1
    ```
    body  
    ```
    [
        {
            "id": 1,
            "name": "CN"
        }
    ]
    ```
# 登录与鉴权 
授权使用 JWT 协议，其接口与 jhipster 的 JWT 授权登录接口一样  
* 获取 Token  
    请求：
    ```
    curl --request POST \
    --url http://localhost:3000/api/authenticate \
    --header 'cache-control: no-cache' \
    --header 'content-type: application/json' \
    --header 'postman-token: dd8547b8-5c18-e5b1-e0e9-621de99914f1' \
    --data '{\n	"password": "admin",\n	"username": "admin"\n}'
    ```
    ```
    POST /api/authenticate HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: 53e4cacc-d444-ed3c-be50-c107693b8d1e

    {
	    "password": "admin",
	    "username": "admin"
    }
    ```
    响应：
    ```
    {
        "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJsb2dpbiI6ImFkbWluIiwiZmlyc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImxhc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0IiwiaW1hZ2VVcmwiOiJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmP2ltYWdlVmlldzIvMS93LzgwL2gvODAiLCJhY3RpdmF0ZWQiOjEsImxhbmdLZXkiOiJlbiIsImFjdGl2YXRpb25LZXkiOm51bGwsInJlc2V0S2V5IjpudWxsLCJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkRGF0ZSI6bnVsbCwicmVzZXREYXRlIjpudWxsLCJsYXN0TW9kaWZpZWRCeSI6InN5c3RlbSIsImxhc3RNb2RpZmllZERhdGUiOm51bGx9LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU0ODM5OTQzNCwiZXhwIjoxNTQ5Njk1NDM0fQ.9y9YOKtJaT33T56A2mKKrSeI0ojCmUFPU5JxvLNR3ds"
    }
    ```
* 获取账号信息  
    请求： 
    ```
    curl --request GET \
    --url http://localhost:3000/api/account \
    --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJsb2dpbiI6ImFkbWluIiwiZmlyc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImxhc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0IiwiaW1hZ2VVcmwiOiJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmP2ltYWdlVmlldzIvMS93LzgwL2gvODAiLCJhY3RpdmF0ZWQiOjEsImxhbmdLZXkiOiJlbiIsImFjdGl2YXRpb25LZXkiOm51bGwsInJlc2V0S2V5IjpudWxsLCJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkRGF0ZSI6bnVsbCwicmVzZXREYXRlIjpudWxsLCJsYXN0TW9kaWZpZWRCeSI6InN5c3RlbSIsImxhc3RNb2RpZmllZERhdGUiOm51bGx9LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU0ODM5OTQzNCwiZXhwIjoxNTQ5Njk1NDM0fQ.9y9YOKtJaT33T56A2mKKrSeI0ojCmUFPU5JxvLNR3ds' \
    --header 'cache-control: no-cache' \
    --header 'postman-token: bc7974d7-c9ff-8ccb-1037-0efdb099db88'
    ```
    ```
    GET /api/account HTTP/1.1
    Host: localhost:3000
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJsb2dpbiI6ImFkbWluIiwiZmlyc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImxhc3ROYW1lIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0IiwiaW1hZ2VVcmwiOiJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmP2ltYWdlVmlldzIvMS93LzgwL2gvODAiLCJhY3RpdmF0ZWQiOjEsImxhbmdLZXkiOiJlbiIsImFjdGl2YXRpb25LZXkiOm51bGwsInJlc2V0S2V5IjpudWxsLCJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkRGF0ZSI6bnVsbCwicmVzZXREYXRlIjpudWxsLCJsYXN0TW9kaWZpZWRCeSI6InN5c3RlbSIsImxhc3RNb2RpZmllZERhdGUiOm51bGx9LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU0ODM5OTQzNCwiZXhwIjoxNTQ5Njk1NDM0fQ.9y9YOKtJaT33T56A2mKKrSeI0ojCmUFPU5JxvLNR3ds
    Cache-Control: no-cache
    Postman-Token: 0697e795-506d-fb51-f35a-cf6009437a8d

    ```
    响应：
    ```
    {
        "id": 3,
        "login": "admin",
        "firstName": "Administrator",
        "lastName": "Administrator",
        "email": "admin@localhost",
        "imageUrl": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
        "activated": 1,
        "langKey": "en",
        "activationKey": null,
        "resetKey": null,
        "createdBy": "system",
        "createdDate": null,
        "resetDate": null,
        "lastModifiedBy": "system",
        "lastModifiedDate": null,
        "authorities": [
            "ROLE_ADMIN",
            "ROLE_USER"
        ]
    }
    ```

* api 入口管制与数据过滤  

    通过 api 前缀来控制接口是否公布给外部访问  
    src/config/RouterSecurityConfiguration.ts  
    ```
    export enum RouterSecurityType {
      PERMIT = 'permit',
      AUTHENTICATED = 'authenticated',
      REJECT = 'reject'
    }

    export default {
      '/api': RouterSecurityType.AUTHENTICATED,
      '/api/authenticate': RouterSecurityType.PERMIT
    }
    ```

    下图为 controller 层中的 Action 方法，通过在方法上添加注解来实现角色权限控制。  

    decoded.allowRole 是指允许用户进来的角色权限，一般情况下用户可能会存在多个角色，所以但多个权限能够匹配进来的时候， allowRole 只会记录 AuthorityCode 数组中靠前的权限名称
    src/controller/RegionAction.ts
    ```
    /**
    * post
    * @param {Application.Context} context
    * @param decoded
    * @returns {Promise<void>}
    */
    @setRoute('/api/regions', RequestMethod.POST, [AuthorityCode.ROLE_ADMIN, AuthorityCode.ROLE_USER])
    async createRegion(context: Context, decoded?: DecodedUserInfo) {
        const regionRepository = getManager().getRepository(Region);
        let region: Region = regionRepository.create(<region>{
          ...context.request.body
        });
        if (decoded.allowRole === AuthorityCode.ROLE_USER) {
        Audit.addCreateInfo(region, decoded.user);
          region.isPublic = false;
          region.isDelete = false;
          region.isVisible = true;
        }
        const errors = await validate(region);
        if (errors.length > 0) {
          throw new BadRequestAlertException(null, errors);
        } else {
          await regionRepository.save(region);
          region = await regionRepository.findOne(region.id);
          await Elastic.syncCreate(region,regionRepository.metadata.tableName);
          context.body = region;
        }
    }
    /**
    * search
    * @param {Application.Context} context
    * @param decoded
    * @returns {Promise<void>}
    */
    @setRoute('/api/_search/regions', RequestMethod.GET, [AuthorityCode.ROLE_ADMIN, AuthorityCode.ROLE_USER])
    async searchArticleRegion(context: Context, decoded?: DecodedUserInfo) {
        let filter;
        if (decoded.allowRole === AuthorityCode.ROLE_USER) {
          filter = [
              {
                term: {
                  createUser: decoded.user.login
                }
              }
          ]
        }
        const res: any = await Elastic.search(getElasticSearchParams(context, filter), 'article_region');
        setElasticSearchPagingHeader(context, res);
        context.body = res.data;
    ```

# 技术栈  

<a href="https://nodejs.org">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/node.png" width="20%">
</a>
<a href="https://github.com/koajs/koa">
    <img src="https://raw.githubusercontent.com/koajs/koa/HEAD/docs/logo.png" width="20%">
</a>
<a href="https://www.tslang.cn">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/typescript.png" width="20%">
</a>
<a href="http://typeorm.io">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/typeorm.png" width="20%">
</a>
<a href="https://www.mysql.com">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/mysql.png" width="20%">
</a>
<a href="https://www.elastic.co">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/elastic.png" width="20%">
</a>
<a href="https://yeoman.io">
    <img src="https://raw.githubusercontent.com/little-snow-fox/images/master/logos/yeoman.png" width="20%">
</a>

# License  
MIT © [snowfox](https://github.com/little-snow-fox)
