#!/usr/bin/env node

const program = require('commander');
const api = require('./index.js')

program
  .option('-x, --xxx', 'what the x')


program
  .command('add')
  .description('add a task')
  .action((source, destination) => {
    if (destination == undefined) {
      api.add('').then(() => {
        console.log('添加成功');
      }, () => {
        console.log('添加失败');
      })
      return
    }
    api.add(destination.join(' ')).then(() => {
      console.log('添加成功');
    }, () => {
      console.log('添加失败');
    })
  });

program
  .command('clear')
  .description('clear all tasks')
  .action((source, destination) => {
    api.clear().then(() => {
      console.log('清除完毕');
    }, () => {
      console.log('清除失败');
    })
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  // 说明用户直接运行 node cli
  api.showAll()
}
