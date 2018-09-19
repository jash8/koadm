const Router = require('koa-router')
const fs = require('fs')

const mongoose = require('mongoose')
const GoodsModel = require('../dataBase/schema/goods')
const CategoryModel = require('../dataBase/schema/Category')
const CategorySubModel = require('../dataBase/schema/CategorySub')

let router = new Router()

// 获取单个商品接口

router.post('/getGoodsList', async(ctx) => {
  let categorySubId = ctx.request.body.categorySubId
  let page = ctx.request.body.page
  let num = 10
  let start = (page-1)*num

  console.log(ctx.request.body)
  await GoodsModel
    .find({SUB_ID:String(categorySubId)})
    .skip(start).limit(num).exec()
    .then(result => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(err=>{
      console.log(err)
      ctx.body = {
        code: 500,
        message: JOSN.stringfy(err)
      }
    })
})




// 获取商品小分类接口

router.post('/getCategorySubList', async(ctx) => {
  let categoryId = ctx.request.body.categoryId
  console.log(ctx.request.body)
  await CategorySubModel
    .find({MALL_CATEGORY_ID:Number(categoryId)})
    .exec()
    .then(result => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(err=>{
      console.log(err)
      ctx.body = {
        code: 500,
        message: JOSN.stringfy(err)
      }
    })
})




// 获取商品大分类接口

router.get('/getCategoryList', async(ctx) => {
  await CategoryModel
    .find()
    .exec()
    .then(result => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(err=>{
      console.log(err)
      ctx.body = {
        code: 500,
        message: err
      }
    })
})








// 获取商品详情信息接口

router.post('/getDetailGoodsInfo', async(ctx) => {
  let goodsId = ctx.request.body.goodsId
  console.log(ctx.request.body)
  await GoodsModel
    .findOne({ID: goodsId})
    .exec()
    .then(result => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(err=>{
      console.log(err)
      ctx.body = {
        code: 500,
        message: err
      }
    })
})

router.get('/insertAllGoodsInfo', async(ctx) => {
  fs.readFile('./dataJson/newGoods.json', 'utf-8', (err, data) => {
    let dataJson = JSON.parse(data)
    // console.log(data)
    let saveCount = 0
    dataJson.map((value) => {
      // console.log(value)
      let newGoods = new GoodsModel(value)
      newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log('保存成功', saveCount)
        })
        .catch(err => {
          console.log('保存失败', err)
        })
    })
  })
  ctx.body = '开始写入数据'
})

router.get('/insertAllCategory', async(ctx) => {
  fs.readFile('./dataJson/category.json', 'utf-8', (err, data) => {
    let dataJson = JSON.parse(data)
    console.log(data)
    let saveCount = 0
    dataJson
      .RECORDS
      .map((value) => {
        console.log(value)
        let newCategory = new CategoryModel(value)
        newCategory
          .save()
          .then(() => {
            saveCount++;
            console.log('保存成功', saveCount)
          })
          .catch(err => {
            console.log('保存失败', err)
          })
      })
  })
  ctx.body = '开始写入数据'
})

router.get('/insertAllCategorySub', async(ctx) => {
  fs.readFile('./dataJson/categorySub.json', 'utf-8', (err, data) => {
    let dataJson = JSON.parse(data)
    console.log(data)
    let saveCount = 0
    dataJson
      .RECORDS
      .map((value) => {
        console.log(value)
        let CategorySub = new CategorySubModel(value)
        CategorySub
          .save()
          .then(() => {
            saveCount++;
            console.log('保存成功', saveCount)
          })
          .catch(err => {
            console.log('保存失败', err)
          })
      })
  })
  ctx.body = '开始写入数据'
})

module.exports = router
