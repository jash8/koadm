const Koa = require('koa')
const app = new Koa()

const mongoose= require('mongoose')
const {connet} = require('./dataBase/init')

const Router = require('koa-router')
let router = new Router()


const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')


const user = require('./routes/user')
const home = require('./routes/home')
const goods = require('./routes/goods')

router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())


app.use(bodyParser())
app.use(cors())


app.use(router.routes())
app.use(router.allowedMethods())



// 链接数据库
;(async ()=>{
  await connet()
})()


app.listen(3000, () => {
  console.log("listen the port 3000")
})