const Generator = require('yeoman-generator');
const fs = require('fs');
const tools = require('./../utils/tools');
const i18n = JSON.parse(fs.readFileSync(__dirname + '/../config/i18n.json'));
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
    if (fs.existsSync('./package.json')) {
      const askCover = await this.prompt([{
        type: 'confirm',
        name: 'cover',
        message: translate.coverAlert,
        default: false
      }]);
      if (!askCover.cover) {
        process.exit();
        return;
      }
    }

    const askProjectOptions = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: translate.projectName + ':',
        default: 'hello-world'
      },
      {
        type: 'input',
        name: 'authorName',
        message: translate.authorName + ':',
        default: ''
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: translate.authorEmail + ':',
        default: ''
      },
      {
        type: 'list',
        name: 'searchEngine',
        message: translate.useSearchEngine,
        choices: response => {
            return [
              {
                  value: 'mysql',
                  name: 'mysql'
              },
              {
                value: 'elasticsearch',
                name: 'elasticsearch'
              }
          ];
        },
        default: 'elasticsearch'
      }
    ]);

    this._generatorAllFiles(askProjectOptions);

  }
  _generatorAllFiles(askOptions) {
    const elementTemplatePath = __dirname + '/templates/koa';
    const files = tools.getDirAllFiles(elementTemplatePath);
    const testPath = debug ? '/test/files' : '';
    const cwd = process.cwd();
    const projectOptions = {
      ...askOptions
    };
    if (debug) {
      if (!fs.existsSync(cwd + '/test')) {
        fs.mkdirSync(cwd + '/test')
      }
      if (!fs.existsSync(cwd + '/test/files')) {
        fs.mkdirSync(cwd + '/test/files')
      }
    }
    files.forEach(item => {
      if (!fs.existsSync(cwd + testPath + item.relativeDir)) {
        try {
          fs.mkdirSync(cwd + testPath + item.relativeDir)
        } catch (e) {
          // 说明出现了一个无文件的目录层级，例如 test/a/b/c.html 中的 a 目录无任何文件存在，只有文件夹，就会出现这个报错了
          // -2 是指目录路径无效，不存在这个目录
          const dirList = item.relativeDir.split('/');
          if (e.errno === -2) {
            for (let i= 0; i < dirList.length; i++) {
              if (dirList[i] === '') continue;
              let path = '';
              for (let n = 0; n <= i; n++) {
                if (dirList[i] !== '') path += '/' + dirList[n];
              }
              if (!fs.existsSync(cwd + testPath + path)) {
                fs.mkdirSync(cwd + testPath + path);
              }
            }
          } else {
            console.error(e);
          }
        }
      }
      // todo: 区分普通文件和 EJS ，普通文件直接复制
      if (item.suffix === '.ejs') {
        let destinationFileFullName = item.fileFullName;
        destinationFileFullName = item.fileFullName.substr(0, item.fileFullName.length - 4);
        this.fs.copyTpl(
          this.templatePath(item.path),
          this.destinationPath(cwd + testPath + item.relativeDir + '/' + destinationFileFullName),
          {
            projectOptions
          }
        );
        console.log('ejs: ' + item.relativeDir + '/' + destinationFileFullName);
      } else {
        fs.writeFileSync(cwd + testPath + item.relativePath, fs.readFileSync(item.path, 'utf-8'));
        console.log('file: ' + item.relativePath);
      }
    });

  }
  end() {

  }
};
