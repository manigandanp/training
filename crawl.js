const axios = require("axios");

module.exports = {
  crawl: async function (url) {
    console.log(`Crawling started for url ${url}`);
    return await axios.get(url).then((msg) => msg.data);
  },
};
