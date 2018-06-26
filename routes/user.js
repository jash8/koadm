const mongoose = require('mongoose')
const Router = require('koa-router')
const UserModel = require('../dataBase/schema/User')

let router = new Router()

router.get('/', (ctx) => {
  ctx.body = "用户首页"
})

router.get('/register', (ctx) => {
  ctx.body = "注册页"
})

router.post('/register', async(ctx) => {

  let newUser = new UserModel(ctx.request.body)

  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err.code=11000?'用户名重复！':'未知错误'
      }
    })
})

module.exports = router
