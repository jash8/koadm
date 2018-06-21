const Koa = require('koa')
const app = new Koa()
const mongoose= require('mongoose')
const {connet,initSchemas} = require('./dataBase/init')
const Router = require('koa-router')
const user = require('./routes/user')
const bodyParser = require('koa-bodyparser')


let router = new Router()

router.get('/',(ctx)=>{
  ctx.body='首页'
})

router.use('/user',user.routes())

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())


// ;(async ()=>{
//   await connet()
//   initSchemas()

//   let userModel = mongoose.model('users')

//   let newUser = new userModel({
//     userName:"Bssey7",
//     password:"1234568",
//   })

//   newUser.save().then(()=>{
//     console.log('success')
//   }).catch((error)=>{
//     console.dir(error)
//   })



// })()


app.listen(3000, () => {
  console.log("listen the port 3000")
})