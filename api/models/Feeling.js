const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeelingSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: [true, 'Type is required either like or dislike']
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Post id is required']
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Feeling', FeelingSchema)