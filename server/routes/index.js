const express = require('express');
const router = express.Router();
const commentRoutes = require('./comments');
const animeRoutes = require('./anime');
const authRoutes = require('./auth');

router.use('/comments', commentRoutes);
router.use('/anime', animeRoutes);
router.use('/auth', authRoutes);

module.exports = router;
