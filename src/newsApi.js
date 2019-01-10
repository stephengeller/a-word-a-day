require("dotenv").config();
const fetch = require("node-fetch");

const apiKey = process.env.NEWS_API_KEY;

async function getNewsArticles(callback) {
  const country = "gb";
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    `country=${country}&` +
    `apiKey=${apiKey}`;
  await fetch(url)
    .then(response => response.json())
    .then(async res => {
      return await callback(res["articles"]);
    })
    .catch(err => {
      throw new Error(err);
    });
}

module.exports = getNewsArticles;
