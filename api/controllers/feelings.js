const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const advancedResultsFunc = require('../utils/advancedResultsFunc')

const Post = require('../models/Post')
const Feeling = require('../models/Feeling')

// @desc    Create feeling
// @route   POST /api/v1/feelings/
// @access  Private
exports.createFeeling = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user._id
  const { type, userId, postId } = req.body

  // check post
  const post = await Post.findById(postId)
  if (!post) {
    return next(new ErrorResponse(`No post with post id of ${postId}`))
  }

  // Check if feeling exists
  let feeling = await Feeling.findOne({
    postId,
    userId
  })
  // if not - create feeling

  if (!feeling) {
    feeling = await Feeling.create({
      type,
      postId,
      userId
    })
    return res.status(200).json({ success: true, data: feeling })
  }
  // else - check req.body.feeling if equals to feeling.type remove
  if (type == feeling.type) {
    await feeling.remove()
    return res.status(200).json({ success: true, data: {} })
  }
  // else - change feeling type
  feeling.type = type
  feeling = await feeling.save()

  res.status(200).json({ success: true, data: feeling })
})

// @desc    Check feeling
// @route   POST /api/v1/feelings/check
// @access  Private
exports.checkFeeling = asyncHandler(async (req, res, next) => {
  const feeling = await Feeling.findOne({
    postId: req.body.postId,
    userId: req.user._id
  })
  if (!feeling) {
    return res.status(200).json({ success: true, data: { feeling: '' } })
  }

  return res
    .status(200)
    .json({ success: true, data: { feeling: feeling.type } })
})

// @desc    Get liked posts
// @route   GET /api/v1/feelings/posts
// @access  Private
exports.getLikedPosts = asyncHandler(async (req, res, next) => {
  const likes = await Feeling.find({
    userId: req.user._id,
    type: 'like'
  })

  if(likes.length === 0)
    return res.status(200).json({ success: true, data: {} })

  const postId = likes.map((post) => {
    return {
      _id: post.postId.toString()
    }
  })

  const populates = [{ path: 'userId', select: 'photoUrl userName' }]
  advancedResultsFunc(req, res, Post, populates, postId)
})
