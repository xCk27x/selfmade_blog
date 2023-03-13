const express = require('express');
const router = express.Router();
const { jwtVerify } = require('../handlers/jwtVerify')

const {
  createPost,
  getAllPosts,
  getOneUserPosts,
  getNPostRandomly,
  deletePost,
} = require('../handlers/postHandlers');

router.route('/')
  .get(getAllPosts)
  .post(jwtVerify, createPost);

router.route('/random/:amount')
  .get(getNPostRandomly);

router.route('/:userId')
  .get(getOneUserPosts);

router.route('/:userId/:postId')
  .delete(jwtVerify, deletePost);

module.exports = router;
