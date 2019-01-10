# A Word A Day

## How to Install
TBC, but:
```bash
git clone git@github.com:stephengeller/a-word-a-day.git
cd a-word-a-day
touch .env
```
Then, populate the .env file with:
- TWITTER_CONSUMER_KEY=...
- TWITTER_CONSUMER_SECRET=...
- TWITTER_ACCESS_TOKEN=...
- TWITTER_ACCESS_TOKEN_SECRET=...
- NEWS_API_TOKEN=...

This gets used by the Twitter library `Twit`. 

You can get the NEWS_API_TOKEN by registering for NewsAPI [here, it's free!](https://newsapi.org/account)  Get the rest [over at the Twitter Developer website, also free](https://developer.twitter.com/).


## Usage

### To send a tweet locally
Run `node sendTweet.js`, or `./sendTweet.sh`