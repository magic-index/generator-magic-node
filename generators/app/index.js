const Generator = require('yeoman-generator');
const fs = require('fs');
const chalk = require('chalk');
const state = require('./utils/state');
const i18n = JSON.parse(fs.readFileSync(__dirname + '/config/i18n.json'));
let translate = {};
let debug = false;

// const testProjectPath = '/Users/snowfox/Developer/temp/test';

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    debug = this.options.debug;
    if (debug) {
      console.log('app/index.js');
    }
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
  async prompting() {

    let language, workType;
    process.argv.forEach(param => {
      if (param === '--framework') {
        workType = 'framework';
        language = 'en';
      } else if (param.indexOf('--entity') === 0) {
        workType = 'entity';
        language = 'en';
      } else if (param.indexOf('--language') === 0 || param.indexOf('--lang') === 0) {
        const str = param.split('=')[1].toLowerCase();
        language = str === 'zh' ? 'zh' : str === 'ja' ? 'ja' : 'en';
      }
    });

    // language
    const askLanguage = language ? { language } : await this.prompt([{
      type: 'input',
      name: 'language',
      message: 'language[en/zh/ja]',
      default: 'en' // Default to current folder name
    }]);
    if (i18n[askLanguage.language]) {
      state.language = askLanguage.language;
    }
    state.i18n = i18n[state.language];
    translate = state.i18n;

    const askWorkType = workType ? { workType } : await this.prompt([{
      type: 'list',
      name: 'workType',
      message: translate.workType,
      choices: [
        {
          name: translate.basicFramework,
          value: 'framework'
        },
        {
          name: translate.entityClass,
          value: 'entity'
        },
      ]
    }]);

    switch (askWorkType.workType) {
      case 'framework':
        this.composeWith(require.resolve('./client'), { language: state.language, debug: this.options.debug });
        break;
      case 'entity':
        this.composeWith(require.resolve('./entity'), { language: state.language, debug: this.options.debug });
        break;
      default:
        break;
    }

  }
};
