const express = require('express');
const router = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
} = require('../handlers/commentHandlers');

router.route('/:postId')
  .post(createComment);

router.route('/:postId/:commentId')
  .post(updateComment)
  .delete(deleteComment);

module.exports = router;