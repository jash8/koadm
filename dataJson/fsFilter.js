const fs = require('fs')
var i = 0
fs.readFile('./goods.json', 'utf-8', function (err,data) {
  let newData = JSON.parse(data)

  let Goods = []
  newData.RECORDS.map(function (item, index) {
      if (item.IMAGE1 != null) {
        console.log(item)
        Goods.push(item)
        i++
      }
    })
    console.log(i)

  fs.writeFile('./newGoods.json', JSON.stringify(Goods),function(err){
    if(err){
      console.log('写入失败')
    }
    else{
      console.log('写入成功')
    }
  })
})