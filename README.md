# A Word A Day

## How to Install
TBC, but:
```bash
git clone git@github.com:stephengeller/a-word-a-day.git
cd a-word-a-day
touch .env
```
Then, populate the .env file with:
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN
- TWITTER_ACCESS_TOKEN_SECRET

This gets used by the Twitter library `Twit`.

## Usage

### To send a tweet locally
Run `node sendTweet.js`, or `./sendTweet.sh`