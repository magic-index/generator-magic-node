const fs = require('fs');
const path = require('path');
module.exports = {
  getDirAllFiles(dirPathSource) {
    const dirPath = dirPathSource.replace(/\\/g, '/');
    const self = this;
    const fileList = [];
    /**
     * 文件遍历方法
     * @param filePath 需要遍历的文件路径
     */
    function fileDisplay(filePathSource) {
      const filePath = filePathSource.replace(/\\/g, '/');
      //根据文件路径读取文件，返回文件列表
      const files = fs.readdirSync(filePath);
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename).replace(/\\/g, '/');
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        const stats = fs.statSync(filedir);
        const isFile = stats.isFile();//是文件
        const isDir = stats.isDirectory();//是文件夹
        const suffix = self._getFileNameSuffix(filename);
        const hierarchy = filedir.split('/');
        const relativePath = filedir.split(dirPath)[1];
        let relativeDir = relativePath.split(filename)[0];
        relativeDir = relativeDir.substr(0, relativeDir.length - 1);
        if (isFile) {
          fileList.push({
            // 文件全名 index.js
            fileFullName: filename,
            // 绝对位置 /Users/snowfox/Developer/gitlab/generator-magic-vue/generators/app/client/templates/element/config/index.js
            path: filedir,
            // 文件后缀 .js
            suffix: suffix.suffix,
            // 文件名 index
            fileName: suffix.name,
            // 文件相对路径 /config/index.js
            relativePath,
            // 文件相对目录 /config
            relativeDir,
            // 目录层级
            hierarchy,
            // 目录层级数
            hierarchyNumber: hierarchy.length
          });
        }
        if (isDir) {
          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
      });
    }
    fileDisplay(dirPath);
    return fileList.sort((a, b) => a.hierarchyNumber - b.hierarchyNumber);
  },
  _getFileNameSuffix(fileName) {
    const suffixObject = /\.[^\.]+$/.exec(fileName);
    const suffix = suffixObject ? suffixObject[0] : '';
    return {
      suffix: suffix === fileName ? '' : suffix,
      name: fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
    };
  },
  /**
   * write the given files using provided config.
   *
   * @param {object} files - files to write
   * @param {object} generator - the generator instance to use
   * @param {boolean} returnFiles - weather to return the generated file list or to write them
   * @param {string} prefix - pefix to add to path
   */
  writeFilesToDisk(files, generator, returnFiles, prefix) {
    const _this = generator || this;
    const filesOut = [];
    const startTime = new Date();
    // using the fastest method for iterations
    for (let i = 0, blocks = Object.keys(files); i < blocks.length; i++) {
      for (let j = 0, blockTemplates = files[blocks[i]]; j < blockTemplates.length; j++) {
        const blockTemplate = blockTemplates[j];
        if (!blockTemplate.condition || blockTemplate.condition(_this)) {
          const path = blockTemplate.path || '';
          blockTemplate.templates.forEach(templateObj => {
            let templatePath = path;
            let method = 'template';
            let useTemplate = false;
            let options = {};
            let templatePathTo;
            if (typeof templateObj === 'string') {
              templatePath += templateObj;
            } else {
              if (typeof templateObj.file === 'string') {
                templatePath += templateObj.file;
              } else if (typeof templateObj.file === 'function') {
                templatePath += templateObj.file(_this);
              }
              method = templateObj.method ? templateObj.method : method;
              useTemplate = templateObj.template ? templateObj.template : useTemplate;
              options = templateObj.options ? templateObj.options : options;
            }
            if (templateObj && templateObj.renameTo) {
              templatePathTo = path + templateObj.renameTo(_this);
            } else {
              // remove the .ejs suffix
              templatePathTo = templatePath.replace('.ejs', '');
            }
            filesOut.push(templatePathTo);
            if (!returnFiles) {
              let templatePathFrom = prefix ? `${prefix}/${templatePath}` : templatePath;
              if (
                !templateObj.noEjs &&
                !templatePathFrom.endsWith('.png') &&
                !templatePathFrom.endsWith('.jpg') &&
                !templatePathFrom.endsWith('.gif') &&
                !templatePathFrom.endsWith('.svg') &&
                !templatePathFrom.endsWith('.ico')
              ) {
                templatePathFrom = `${templatePathFrom}.ejs`;
              }
              // if (method === 'template')
              _this[method](templatePathFrom, templatePathTo, _this, options, useTemplate);
            }
          });
        }
      }
    }
    this.debug(`Time taken to write files: ${new Date() - startTime}ms`);
    return filesOut;
  },
  hyphenTransformHump(str) {
    var re=/-(\w)/g;
    return str.replace(re,function ($0,$1){
      return $1.toUpperCase();
    });
  },
  hyphenTransformPascal(str) {
    var re=/-(\w)/g;
    const newStr = str.replace(re,function ($0,$1){
      return $1.toUpperCase();
    });
    return newStr.substr(0, 1).toUpperCase() + newStr.substr(1);
  },
};
