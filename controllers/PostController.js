const Post = require('../models/Post')
const { processErrors } = require('../helpers/errors')
const perPage = 10

/**
 * Get Posts.
 *
 * @param req
 * @returns {Promise<{code: number, data: *}>}
 */
exports.index = async function (req) {
  const page = req.query.page || 1
  const regex = { $regex: req.query.filter, $options: "i" }
  const query = req.query.filter ?
    {
      $and: [
        { userID: req.payload.id, deletedAt: null },
        { $or: [{ title: regex }, { content: regex }] }
      ]
    } : { userID: req.payload.id, deletedAt: null }

    console.log('>>>', query);
    
  return await Post.find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(posts => {
      console.log(posts,'<<<<<<<<<<<<<<<<<posts');
      
      return { data: { message: 'Posts encontrados', posts }, code: 200 }
    }).catch(reason => {
      console.log(reason,'<<<<<<<<<reason catch');
      
      return { data: { errors: processErrors(reason).errors }, code: 422 }
    })
}

/**
 * Store Post.
 *
 * @param req
 * @returns {Promise<{code: number, data: *}>}
 */
exports.store = async function (req) {
  let data = new Post()

  data.userID = req.payload.id
  data.image = req.body.image
  data.title = req.body.title
  data.content = req.body.content

  return await data.save().then((post) => {
    return { data: { message: 'Post creado correctamente', post }, code: 200 }
  }).catch(reason => {
    return { data: { errors: processErrors(reason).errors }, code: 422 }
  })
}

exports.delete = async function (req) {
  return await Post.findOne({
    _id: req.params.id,
    userID: req.payload.id
  }).then(async (post) => {
    if (post) {
      post.disable(true)
      return await post.save().then(() => {
        return { data: { message: 'Post borrado' }, code: 200 }
      }).catch(reason => {
        return { data: { errors: processErrors(reason).errors }, code: 404 }
      })
    } else {
      return { data: { errors: { error: 'No encontrado' } }, code: 404 }
    }
  }).catch((reason) => {
    return { data: { errors: processErrors(reason) }, code: 400 }
  })
}