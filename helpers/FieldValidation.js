const validation = require('../helpers/validation')

exports.validBodyEmailBag = function (req) {
  if (!req.body.name) return {name: 'Este campo es obligatorio'}
  return null
}

exports.validBodyRole = function (req) {
  if (!req.body.name) return {name: 'Este campo es obligatorio'}
  if (!req.body.description) return {description: 'Este campo es obligatorio'}
  return null
}

exports.validBodyUser = function (req) {
  if (!!req.body.companyID) {
    if (!req.body.companyID._id) return {companyID: 'Este campo no contiene _id'}
    if (!req.body.companyID.name) return {companyID: 'Este campo no contiene name'}
  }
  if (!req.body.firstName) return {firstName: 'Este campo es obligatorio'}
  if (!req.body.lastName) return {lastName: 'Este campo es obligatorio'}
  if (!req.body.email) return {email: 'Este campo es obligatorio'}
  if (!req.body.role) return {role: 'Este campo es obligatorio'}
  return null
}

exports.validBodyUserUpdate = function (req) {
  if (req.body.password) {
    if (!validation.validations.password(req.body.password)) return {password: validation.messages.password}
  }
  return null
}

exports.validBodyCertificationMail = function (req) {
  if (!req.body.email) return {email: 'Este campo es obligatorio'}
}

exports.validBodyAttachment = function (req) {
  if (!req.body.companyID) return {companyID: 'Este campo es obligatorio'}
  if (!req.body.attachment) return {attachment: 'Este campo es obligatorio'}
  return null
}

exports.validBodydisabledCompanyUsers = function (req) {
  if (!req.body.companyID) return {companyID: 'Este campo es obligatorio'}
  if (typeof req.body.deleteAt !== 'boolean') return {deleteAt: 'Este campo es obligatorio'}
  return null
}
