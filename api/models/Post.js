const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Must be three characters long']
    },
    description: {
      type: String,
      default: ''
    },
    thumbnailUrl: {
      type: String,
      default: 'no-photo.jpg'
    },
    views: {
      type: Number,
      default: 0
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

PostSchema.index({ title: 'text' })

PostSchema.virtual('dislikes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
  count: true,
  match: { type: 'dislike' }
})

PostSchema.virtual('likes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
  count: true,
  match: { type: 'like' }
})

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
  count: true
})

module.exports = mongoose.model('Post', PostSchema)
