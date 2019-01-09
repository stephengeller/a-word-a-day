const apiKey = process.env.NEWS_API_KEY;
const newsapi = new NewsAPI(apiKey);

async function getNewsArticles() {
  await newsapi.v2
    .topHeadlines({ country: "gb" })
    .then(res => {
      return res;
    })
    .catch(err => {
      res.send({ response: false, err: err });
    });
}
