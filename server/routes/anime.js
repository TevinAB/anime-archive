const express = require('express');
const router = express.Router();
const { getAnime } = require('../handlers/anime');

/**
 * @route /anime/category/subtype
 * @description Used to get top anime/characters from jikan
 * @param category - Category type (anime,character)
 * @param limit - The amount of items to respond with
 * @param subtype - Category subtype (airing,upcoming,etc) [OPTIONAL]
 * @access Public
 */
router.get('/:category/:limit/:subtype?', getAnime);

module.exports = router;
