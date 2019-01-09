const Twit = require("twit");
require("dotenv").config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

const bot = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

function getRandomNewsTitle() {
  return "some random news title";
}

function getRandomWord(string) {
  const wordArr = string.split(" ");
  return wordArr[Math.floor(Math.random() * wordArr.length)];
}

function getDefinition(string) {
  return `Definition of ${string}: ""`;
}

const postToTwitter = (message, dateAndTime) => {
  return bot.post(
    "statuses/update",
    { status: message + " at " + dateAndTime },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const notice =
          dateAndTime + ": **** " + `"${data.text}"` + " was tweeted ****";
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

function createWordDefinitionTweet() {
  const newsTitle = getRandomNewsTitle();
  const randomWord = getRandomWord(newsTitle);
  return getDefinition(randomWord);
}

exports.handler = function(event, context, callback) {
  const dateAndTime = getDateAndTime();
  const wordDefinition = createWordDefinitionTweet();
  postToTwitter(wordDefinition, dateAndTime);
};
