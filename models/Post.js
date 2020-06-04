var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

const msgs = require('../helpers/validation').messages

var PostSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, msgs.required]
    },
    image: {
        type: String,
        required: [true, msgs.required]
    },
    title: {
        type: String,
        required: [true, msgs.required]
    },
    content: {
        type: String,
        required: [true, msgs.required]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date,
    }
}, { collection: 'post' });

PostSchema.post('find', function (posts) {
    posts.forEach(function (post, index, object) {
        if (post.deletedAt === null) object.splice(index, 1);
    });
})

PostSchema.methods.disable = function (condition) {
    if (condition) this.deletedAt = moment()
    else this.deletedAt = null
}

module.exports = mongoose.model('Post', PostSchema);