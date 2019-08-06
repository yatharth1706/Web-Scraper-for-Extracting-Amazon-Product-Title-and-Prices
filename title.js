const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        title: $('#productTitle', html).text().trim(),
        cost: $('#priceblock_ourprice', html).text().trim(),
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;