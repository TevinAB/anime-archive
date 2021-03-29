const express = require('express');
const router = express.Router();
const commentRoutes = require('./comments');
const animeRoutes = require('./anime');

router.use('/comments', commentRoutes);
router.use('/anime', animeRoutes);

module.exports = router;
