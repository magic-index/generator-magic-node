const Generator = require('yeoman-generator');
const fs = require('fs');
const entity = require('./../utils/entity');

function getFileList(options) {
  return [
    {
      file: 'entity-model.ts.ejs',
      target: `src/entity/${options.entity.entityClassName}.ts`
    },
    {
      file: 'entity-action.ts.ejs',
      target: `src/controller/${options.entity.entityClassName}Action.ts`
    }
  ];
}
module.exports = {
  generatorFiles(askEntityOptions, generator = Generator) {
    // 当前执行路径
    const cwd = process.cwd();
    // 模版路径
    const templatePath = __dirname + '/templates/koa';
    // 获得实体对应的连接字符文件名
    let entityFolderName = askEntityOptions.entityName.replace(/([A-Z])/g,"-$1").toLowerCase();
    if (entityFolderName[0] === '-') {
      entityFolderName = entityFolderName.substr(1)
    }
    // 读入 .yo-rc.json
    const yoConfig = generator.fs.readJSON(cwd + '/.yo-rc.json');
    // 读入数据模型 JSON
    const entityJson = generator.fs.readJSON(cwd + '/.jhipster/' + askEntityOptions.entityName + '.json');
    const options = {
      entity: entity.getTemplateParams(entityJson),
      yoConfig
    }
    getFileList(options).forEach(item => {
      generator.fs.copyTpl(
        generator.templatePath(templatePath + '/' + item.file),
        generator.destinationPath(cwd + '/' + item.target),
        options
      );
    })
  }
};
