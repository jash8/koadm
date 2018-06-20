const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

let ObjectId = Schema.Types.ObjectId

const SALT_WORK_FACTOR = 12

const UserShcema = new Schema({
  UserId: {
    type: ObjectId
  },
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
})

UserShcema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('users', UserShcema)