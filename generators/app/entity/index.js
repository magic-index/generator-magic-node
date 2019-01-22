const Generator = require('yeoman-generator');
const fs = require('fs');
const tools = require('./../utils/tools');
const i18n = JSON.parse(fs.readFileSync(__dirname + '/../config/i18n.json'));
const files = require('./files');
let translate = {};
let debug = false;

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    debug = this.options.debug;
    if (debug) {
      this.log('app/client/index.js');
    }
    translate = i18n[this.options.language];
  }
  async prompting() {
    const cwd = process.cwd();
    let entityName;
    process.argv.forEach(param => {
      if (param.indexOf('--entity') === 0) {
        entityName = param.split('=')[1].toLowerCase();
      }
    });
    let askEntityOptions;
    while (true) {
      askEntityOptions = entityName ? { entityName } : await this.prompt([
        {
          type: 'input',
          name: 'entityName',
          message: translate.entityName + ':',
          default: ''
        }
      ]);
      if (askEntityOptions.entityName === '') {
        this.log(translate.notInputContentAlert);
        continue;
      }
      // 避免首字母没大写的问题
      askEntityOptions.entityName = askEntityOptions.entityName[0].toUpperCase() + askEntityOptions.entityName.substr(1);
      if (!fs.existsSync(cwd + '/.jhipster') || !fs.existsSync(cwd + '/.jhipster/' + askEntityOptions.entityName + '.json')) {
        this.log(translate.entityNotExistsAlert);
      } else {
        files.generatorFiles(askEntityOptions, this);
        break;
      }
    }

  }

  end() {

  }
};
