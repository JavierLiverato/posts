const mongoose = require('mongoose')
const moment = require('moment')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const config = require('../config/config')
const msgs = require('../helpers/validation').messages
const validations = require('../helpers/validation').validations

let userSchema = new Schema({
  email: {
    type: String,
    required: [true, msgs.required],
    unique: true,
    sparse: true,
    lowercase: true,
  },
  userName: {
    type: String,
    required: [true, msgs.required],
    validate: {validator: validations.name, message: msgs.name}
  },
  password: {
    type: String,
  },
  salt: String,
  createdAt: {
    type: Date,
    immutable: true
  },
  updateAt: {
    type: Date
  },
  deleteAt: {
    type: Date,
  }
})

/*** ========   Schema hooks ===================***/
userSchema.pre('save', function (next) {
  if (this.isNew) this.createdAt = moment()
  else if (this.isModified) this.updateAt = moment()

  if (this.isModified("password")) this.setPassword(this.password)

  if (this.email) this.email = this.email.toLowerCase()

  next()
})

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

userSchema.methods.validatePassword = function (password) {
  const passwordCrypto = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.password === passwordCrypto
}

userSchema.methods.generateJWT = async function () {
  const now = new Date()
  let expirationDate = new Date(now)
  console.log(expirationDate,'<<< token creation');
  expirationDate.setTime(expirationDate.getTime() + (config.jwt.expHours*3600000));
  console.log(expirationDate,'<<< token expiration');
  
  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, config.jwt.secret)
}

userSchema.methods.toAuthJSON = async function () {
  return await this.generateJWT().then(token => {
    return { token }
  })
}

userSchema.methods.disable = function (condition) {
  if (condition) this.deleteAt = moment()
  else this.deleteAt = null
}

module.exports = mongoose.model('User', userSchema)
