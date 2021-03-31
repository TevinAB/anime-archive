const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { signInHandler } = require('../handlers/auth');

/**
 * @route /auth [POST]
 * @description Used to verify if the auth token from google is valid
 * @access Public
 */
router.post('/', auth, signInHandler);

module.exports = router;
