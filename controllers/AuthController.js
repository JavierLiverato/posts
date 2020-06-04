const User = require('../models/User')
const { processErrors } = require('../helpers/errors')

/**
 * Login account
 *
 * @param req
 * @returns {Promise<{code: number, data: 
 * {errors: {password: string}}}|{code: number, data: {errors: {email: string}}}|*>}
 */
exports.login = async function (req) {
  if (!req.body.email) return { code: 422, data: { errors: { email: 'Este campo es obligatorio' } } }
  if (!req.body.password) return { code: 422, data: { errors: { password: 'Este campo es obligatorio' } } }

  return User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return { code: 422, data: { errors: { error: 'No se encontró el usuario.' } } }
    }
    if (!user.validatePassword(req.body.password)) {
      return { code: 422, data: { errors: { error: 'Contraseña incorrecta.' } } }
    }
    return await user.toAuthJSON().then(data => {
      return { code: 200, data: data }
    })
  }).catch(function (err) {
    return { data: processErrors(err), code: 422 }
  }
  )
}

/**
 * Refresh Token
 *
 * @param req
 * @returns {Promise<{code: number, data: 
  * {errors: {password: string}}}|{code: number, data: {errors: {email: string}}}|*>}
  */
exports.refresh = async function (req) {
  return User.findById(req.payload.id).then(async (user) => {
    if (!user) {
      return { code: 422, data: { errors: { error: 'No se encontró el usuario.' } } }
    }
    return await user.toAuthJSON().then(data => {
      return { code: 200, data: data }
    })
  }).catch(function (err) {
    return { data: processErrors(err), code: 422 }
  }
  )
}