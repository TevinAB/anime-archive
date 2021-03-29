const request = require('request');
const https = require('https');

module.exports = {
  getAnime: (req, res) => {
    const { category, subtype, limit } = req.params;

    //builds the path to jikan. Adds the subtype if one was specified.
    const path =
      `https://api.jikan.moe/v3/top/${category}` +
      (subtype ? `/1/${subtype}` : '/1');

    request({ url: path }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //Trims down array to match the limit given
        let result = JSON.parse(body).top.slice(0, limit);

        res.json({ results: result });
      } else {
        res.status(400).json({ msg: 'Error fetching data' });
      }
    });
  },
};
