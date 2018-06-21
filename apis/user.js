const mongoose = require('mongoose')

const Router = require('koa-router')
let router = new Router()


router.get('/',(ctx)=>{
  ctx.body="首页"
})

router.get('/register',(ctx)=>{
  ctx.body="注册页"
})

module.exports=router
