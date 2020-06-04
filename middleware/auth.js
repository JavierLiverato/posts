const jwt = require('express-jwt')
const config = require('../config/config')

const getTokenFromHeaders = (req) => {
  const {headers: {authorization}} = req
  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }
  return null
}

exports.required = jwt({
  secret: config.jwt.secret,
  userProperty: 'payload',
  getToken: getTokenFromHeaders,
})

exports.optional = jwt({
  secret: config.jwt.secret,
  userProperty: 'payload',
  getToken: getTokenFromHeaders,
  credentialsRequired: false,
})
