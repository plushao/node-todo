const fs = require('fs');
// 获取home目录
const homedir = require('os').homedir();
// 获取home变量
const home = process.env.HOME || homedir;
// path 用来拼路径
const p = require('path')
const dbPath = p.join(home, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(dbPath, {
                flag: 'a+'
            }, (error, data) => {
                if (error) {
                    reject(error)
                    return
                }
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)

            })
        })

    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string, (error) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve()
            })
        })
    }
}

module.exports = db