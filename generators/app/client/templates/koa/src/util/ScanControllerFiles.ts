import * as fs from 'fs';

export function scanControllerFiles(callback?: Function) {
  fs.readdir('src/controller', (err, files) => {
    const regex = /^[\w-]+(\.js)$/;
    files.forEach((fileName) => {
      if (regex.test(fileName)) {
        require(`./../controller/${fileName.substr(0, fileName.length - 3)}`);
      }
    });
    if (callback) {
      callback();
    }
  });
}