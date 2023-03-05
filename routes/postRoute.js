const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getOneUserPosts,
  deletePost,
} = require('../handlers/postHandlers');

router.route('/')
  .get(getAllPosts)
  .post(createPost);

router.route('/:userId')
  .get(getOneUserPosts);

router.route('/:userId/:postId')
  .delete(deletePost);

module.exports = router;
