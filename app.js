const Koa = require('koa')
const app = new Koa()

const mongoose= require('mongoose')
const {connet,initSchemas} = require('./dataBase/init')

const Router = require('koa-router')
const user = require('./routes/user')
const home = require('./routes/home')

const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

let router = new Router()


router.use('/user',user.routes())
router.use('/home',home.routes())

app.use(bodyParser())
app.use(cors())

app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
  await connet()
  initSchemas()

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



})()


app.listen(3000, () => {
  console.log("listen the port 3000")
})