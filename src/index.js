const Twit = require("twit");
require("dotenv").config();
const getNewsArticles = require("./newsApi");
const { getWordAndDefinition } = require("./articleFunctions");

const MAX_TWEET_LENGTH = 280;

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
  return client.post("statuses/update", { status: message }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return notice(dateAndTime, data);
    }
  });
};

function notice(dateAndTime, data) {
  const notice =
    dateAndTime + ": **** " + `"${data.text}"` + " **** was tweeted.";
  console.log(notice);
  return notice;
}

function getDateAndTime() {
  const d = new Date();
  const time = d.toLocaleTimeString();
  const date = d.toLocaleDateString();
  return `${date} ${time}`;
}

function shortenTweet(tweetString) {
  return tweetString.substring(0, MAX_TWEET_LENGTH - 5) + "...";
}

exports.handler = async function(
  event,
  context,
  callback,
  client = createTwitClient()
) {
  await getNewsArticles(articles => {
    const dateAndTime = getDateAndTime();
    return getWordAndDefinition(articles)
      .then(({ word, definition, err }) => {
        let tweetString = `The definition of "${word}" is: ${definition}`;

        if (tweetString.length >= MAX_TWEET_LENGTH) {
          console.log(tweetString.length);
          tweetString = shortenTweet(tweetString);
        }

        return postToTwitter(tweetString, dateAndTime, client);
      })
      .catch(err => console.log(err));
  });
};
