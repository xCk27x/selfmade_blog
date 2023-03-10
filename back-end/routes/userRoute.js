const express = require('express');
const router = express.Router();

const { jwtVerify } = require('../handlers/jwtVerify');

const {
  userRegister,
  userLogin,
  getUserInfo,
} = require('../handlers/userHandlers');

router.route('/')
  .get(jwtVerify, getUserInfo);

router.route('/register')
  .post(userRegister);

router.route('/login')
  .post(userLogin);

module.exports = router;
