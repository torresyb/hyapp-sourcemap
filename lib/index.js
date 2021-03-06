/**
 * @author yangbin
 * @date 2019/8/26
 * @Description: read opts col/row/file
 */
const fs = require('fs');
const chalk = require('chalk');
const sourceMap = require('source-map');

let sourcesPathMap = {}
let resolvePath = function (filePath) {
  return filePath.replace(/\.[\.\/]+/g, "");
}

const readFile = function (file) {
  return new Promise(function (resolve, reject) {
    fs.exists(file, function (exist) {
      if (exist) {
        fs.readFile(file, {encoding: 'utf-8'}, function (error, data) {
          if (error) {
            console.log(chalk.red(err));
            return reject(error);
          }
          let fileContent = data.toString();
          let fileObj = JSON.parse(fileContent);
          let sources = fileObj['sources'];
          sources.map(item => {
            sourcesPathMap[resolvePath(item)] = item
          })
          resolve({fileContent, fileObj, sources});
        });
      } else {
        console.log(chalk.red('filepath is error'));
        return reject(error);
      }
    });
  });
};

// 读取map文件
async function readMapFile (file, line, column) {
  const mapFile = await readFile(file);
  const consumer = await new sourceMap.SourceMapConsumer(mapFile.fileContent);
  const rst = consumer.originalPositionFor({
    line: line,
    column: column
  });
  let originSource = sourcesPathMap[rst.source];
  let sourcesContent = mapFile.fileObj.sourcesContent[mapFile.sources.indexOf(originSource)];
  // 源码组装成数组，方便console.log输出
  let lines = sourcesContent.split('\n')
  lines = lines.map(item => {
    return item+'\n'
  })
  rst.lines = lines
  consumer.destroy()
  return rst
}

module.exports = readMapFile
