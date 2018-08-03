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
        message: err.code = 11000
          ? '用户名重复！'
          : '未知错误'
      }
      // console.log("注册用户出错信息: ", err)
    })
})

router.post('/login', async(ctx) => {

  let loginUser = ctx.request.body
  // console.log("loginUser: ", loginUser)
  let password = loginUser.password
  let userName = loginUser.userName

  await UserModel
    .findOne({userName: userName})
    .exec()
    .then(async result => {
      // console.log("result: ", result)
      if (result) {
        // console.log(UserModel.comparePassword)
        await UserModel
          .comparePassword(password, result.password)
          .then(isMatch => {
            ctx.body = {
              code: 200,
              login:isMatch,
              message: isMatch?'登录成功':'您的密码错误'
            }
          })
          .catch(err => {
            console.log("err: ", err)
            ctx.body = {
              code: 500,
              message: err
            }
          })
      } else {
        ctx.body = {
          code: 200,
          message: '用户名不存在'
        }
      }
    })
    .catch(err => {
      console.log("err: ",err)
      ctx.body = {
        code: 500,
        message: err
      }
    })

})

module.exports = router
