require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.NEWS_API_KEY;

async function getNewsArticles(callback) {
  const country = "gb";
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    `country=${country}&` +
    `apiKey=${apiKey}`;
  await axios
    .get(url)
    .then(async res => {
      return await callback(res.data["articles"]);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = getNewsArticles;
