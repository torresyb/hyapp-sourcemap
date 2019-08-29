#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const pkg = require('../package')
const readMapFile = require('../lib/index')
// 版本
program
  .version(pkg.version, '-v, --version')
  .description(chalk.yellow('Start restoring error codes...'))
  .usage('[options]')
// 参数介绍
program
  .option('-f, --source-file', 'The file path of source map')
  .option('-l, --line', 'The line number of pros error')
  .option('-c, --column', 'The column number of pros error')
// 帮组
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`sm --help`)} for detailed usage of given command.`)
  console.log()
})
// 执行参数
program.parse(process.argv)
// 命令参数缺一不可
const optionsLen = program.args.length
if(optionsLen != 3){
  console.log(chalk.red('Please check the options'))
  program.help()
  return
}
// 获取命令行文件路径，行，列
const file = program.args[0]
const line = Number(program.args[1])
const column = Number(program.args[2])
readMapFile(file, line, column).then(({source, line, column, name, sourceContent}) => {
  // 源码组装成数组，方便console.log输出
  let lines = sourceContent.split('\n')
  lines = lines.map(item => {
    return item+'\n'
  })
  // ~~~~~~~~~~~~~~~    命令行输出
  console.log(chalk.blue('★') + chalk.greenBright('sourceFilePath') + ': ' + chalk.yellowBright(source));
  console.log(chalk.blue('★') + chalk.greenBright('line') + ': ' + chalk.yellowBright(line));
  console.log(chalk.blue('★') + chalk.greenBright('column') + ': ' + chalk.yellowBright(column));
  console.log(chalk.blue('★') + chalk.greenBright('name') + ': ' + chalk.yellowBright(name));
  console.log('--------start 错误代码--------')
  console.log(
    chalk.hex('#fff')(lines.slice((line-5 < 0) ? 0 : (line-5), line-1).join('')) +
    chalk.red('*' + lines[line-1]) +
    chalk.hex('#fff')(lines.slice(line, line+5).join(''))
  )
  console.log('--------end 错误代码--------')
}).catch(err => {
  console.log(chalk.red(err))
  program.help()
})
