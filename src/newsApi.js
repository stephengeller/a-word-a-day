require("dotenv").config();
const apiKey = process.env.NEWS_API_KEY;

const NewsAPI = require("newsApi");
const newsapi = new NewsAPI(apiKey);

function getNewsArticles(callback) {
  return newsapi.v2
    .topHeadlines({ country: "gb" })
    .then(res => {
      return callback(res["articles"]);
    })
    .catch(err => {
      throw new Error(err);
    });
}

module.exports = getNewsArticles;
