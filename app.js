const Koa = require('koa')
const app = new Koa()
const mongoose= require('mongoose')
const {connet,initSchemas} = require('./dataBase/init')

app.use(async(ctx) => {
  ctx.body = '<h2>Hello</h2>'
})

;(async ()=>{
  await connet()
  initSchemas()

  let userModel = mongoose.model('users')

  let newUser = new userModel({
    userName:"Bssey7",
    password:"1234568",
  })

  newUser.save().then(()=>{
    console.log('success')
  }).catch((error)=>{
    console.dir(error)
  })



})()


app.listen(3000, () => {
  console.log("listen the port 3000")
})