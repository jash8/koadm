const mongoose = require('mongoose')
const db = 'mongodb://adminOwner:adminOwner@localhost:27017/webs'
const glob = require('glob')
const {resolve} = require('path')

module.exports = {
  
  connet: function () {

    mongoose.connect(db)

    let maxContectNum = 0

    return new Promise((resolve, reject) => {

      mongoose
        .connection
        .on("disconnected", () => {
          console.log("...数据库连接断开")
          if (maxContectNum <= 3) {
            mongoose.connect(db)
            maxContectNum++
          } else {
            reject()
            throw new Error("数据库连接未成功,请手动检测!")
          }

        })

      mongoose
        .connection
        .on("error", (err) => {
          console.log("...数据库连接错误")
          if (maxContectNum <= 3) {
            mongoose.connect(db)
            maxContectNum++
          } else {
            reject(err)
            throw new Error("数据库连接未成功,请手动检测!")
          }
        })

      mongoose
        .connection
        .on("open", () => {
          console.log("...数据库连接成功")
          resolve()
        })

    })

  },

}
