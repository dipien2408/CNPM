const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const Post = require('../models/Post')

// @desc    Get posts
// @route   GET /api/v1/posts/public or /api/v1/posts/private
// @access  Public Or Private
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'categoryId'
    })
    .populate({ path: 'userId', select: 'userName photoUrl' })
    .populate({ path: 'likes' })
    .populate({ path: 'dislikes' })
    .populate({ path: 'comments' })
  if (!post) {
    return next(new ErrorResponse(`No post with that id of ${req.params.id}`))
  }

  res.status(200).json({ sucess: true, data: post })
})

// @desc    Upload post
// @route   PUT /api/v1/post
// @access  Private
exports.postUpload = asyncHandler(async (req, res, next) => {
  const post = await Post.create({
    ...req.body,
    userId: req.user._id
  })
  return res.status(200).json({ sucess: true, data: post })
})

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!post)
    return next(new ErrorResponse(`No post with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: post })
})

// @desc    Update post views
// @route   PUT /api/v1/posts/:id/views
// @access  Public
exports.updateViews = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id)

  if (!post)
    return next(new ErrorResponse(`No post with that id of ${req.params.id}`))

  post.views++

  await post.save()

  res.status(200).json({ success: true, data: post })
})

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findOne({ userId: req.user._id, _id: req.params.id })

  if (!post) {
    return next(new ErrorResponse(`No post with id of ${req.params.id}`, 404))
  }

  await post.remove()
  return res.status(200).json({ success: true, post })
})
