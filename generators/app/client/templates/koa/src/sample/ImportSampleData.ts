import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import {getConnection, getRepository} from 'typeorm';
import * as MD5 from 'md5';
import {MagicSampleDataLog} from "../entity/MagicSampleDataLog";
let sampleConfig;
try {
  sampleConfig = JSON.parse(fs.readFileSync(__dirname + '/sample-config.json').toString());
} catch (e) {
  sampleConfig = {
    index: []
  }
}
/**
 * 导入样本数据
 */
export default class ImportSampleData {
  static async run() {
    console.log('start installing sample data.');
    for (let i = 0; i < sampleConfig.index.length; i++) {
      const tableName = sampleConfig.index[i];
      console.log('installing ' + tableName);
      try {
        // 获得插入样本数据的日志数据
        const logs: MagicSampleDataLog[] = await getRepository(MagicSampleDataLog)
          .createQueryBuilder('log')
          .where(`log.tableName = :name`, { name: tableName })
          .getMany();
        const md5CodeList = [];
        logs.forEach(item => {
          md5CodeList.push(item.md5);
        });
        await new Promise((resolve, reject) => {
          const csvPath = `${__dirname}/${tableName}.csv`;
          if (!fs.existsSync(csvPath)) {
            console.warn(`File not found: ${csvPath}`);
            resolve();
            return;
          }
          // 解析出来的数据对象存放处
          const dataList = [];
          // 开始读入并解析 csv 文件成数据对象
          fs.createReadStream(csvPath)
            .pipe(csvParser({
              separator: ';'
            }))
            .on('data', function(data){
              dataList.push(data);
            })
            .on('end',async function(){
              for (let n = 0; n < dataList.length; n++) {
                const data = dataList[n];
                try {
                  // 判断数据是否已经存在于日志里，如果是则说明已经插入过，不再插入
                  const md5Code = MD5(JSON.stringify(data));
                  if (md5CodeList.indexOf(md5Code) > -1) {
                    continue;
                  }
                  const keys = Object.keys(data);
                  // 把真假属性值转为数字
                  keys.forEach(key => {
                    if (data[key] === 'false') {
                      data[key] = 0;
                    } else if (data[key] === 'true') {
                      data[key] = 1;
                    }
                  });
                  // 插入数据样本数据到数据库
                  await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(tableName).values([
                      data
                    ])
                    .execute();
                  // 插入操作日志到数据库
                  md5CodeList.push(md5Code);
                  await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(MagicSampleDataLog).values([
                      {
                        tableName: tableName,
                        md5: md5Code,
                        createdDate: new Date()
                      }
                    ])
                    .execute();
                } catch (e) {
                  console.error(JSON.stringify(data));
                  throw e;
                }
              }
              resolve();
            });
        });
      } catch (e) {
        console.error(`${tableName} table installing sample data error.`);
        throw e;
      }
    }
    console.log('end install sample data.');
  }
}
