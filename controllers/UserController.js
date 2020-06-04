const User = require('../models/User')
const {processErrors} = require('../helpers/errors')

/**
 * Store user.
 *
 * @param req
 * @returns {Promise<{code: number, data: *}>}
 */
exports.store = async function (req) {
  let data = new User()
  data.userName = req.body.userName
  data.email = req.body.email
  data.password = req.body.password
  
  const user = await User.findOne({email: data.email}).exec()
  if (user) return {data: {errors: {email: 'Este correo ya esta registrado'}}, code: 400}

  return await data.save().then((user) => {
    console.log(user,'------------');
    
    return {data: {message: 'Usuario creado correctamente', _id: data._id}, code: 200}
  }).catch(reason => {
    return {data: {errors: processErrors(reason).errors}, code: 422}
  })
}
