const express = require('express')
const {
  getPosts,
  getPost,
  postUpload,
  updatePost,
  updateViews,
  deletePost
} = require('../controllers/posts')

const Post = require('../models/Post')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')

router.post('/', protect, postUpload)

//personal post
router.route('/private').get(
  protect,
  advancedResults(
    Post,
    [
      { path: 'userId' },
      { path: 'categoryId' },
      { path: 'likes' },
      { path: 'dislikes' },
      { path: 'comments' }
    ]
  ),
  getPosts
)

//all post
router
  .route('/public')
  .get(
    advancedResults(
      Post,
      [
        { path: 'userId' },
        { path: 'categoryId' },
        { path: 'likes' },
        { path: 'dislikes' }
      ],
      { status: 'public' }
    ),
    getPosts
  )

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost)

  router.route('/:id/views').put(protect, updateViews)

module.exports = router
