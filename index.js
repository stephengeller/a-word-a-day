const Twit = require("twit");
require("dotenv").config();
const getNewsArticles = require("./newsApi");
const { createWordDefinitionTweet } = require("./articleFunctions");

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

function createTwitClient() {
  return new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
  });
}

const postToTwitter = (message, dateAndTime, client) => {
  return client.post(
    "statuses/update",
    { status: message + " at " + dateAndTime },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const notice =
          dateAndTime + ": **** " + `"${data.text}"` + " **** was tweeted.";
        console.log(notice);
        return notice;
      }
    }
  );
};

function getDateAndTime() {
  const d = new Date();
  const time = d.toLocaleTimeString();
  const date = d.toLocaleDateString();
  return `${date} ${time}`;
}

exports.handler = async function(
  event,
  context,
  callback,
  client = createTwitClient()
) {
  await getNewsArticles(articles => {
    const dateAndTime = getDateAndTime();
    createWordDefinitionTweet(articles).then(({ word, definition }) => {
      const tweetString = `The definiton of [${word}] is: ${definition}`;
      postToTwitter(tweetString, dateAndTime, client);
    });
  });
};
