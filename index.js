const Twit = require("twit");
require('dotenv').config();

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

const postToTwitter = message => {
    return bot.post("statuses/update", { status: message }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const notice = dateAndTime + ": **** " + `"${data.text}"` + " was tweeted ****"
            console.log(notice);
            return notice
        }
    });
};

exports.handler = function(event, context, callback) {
    const d = new Date();
    const time = d.toLocaleTimeString();
    const date = d.toLocaleDateString();
    const dateAndTime = `${date} ${time}`;
    postToTwitter("it is currently: " + dateAndTime)
};