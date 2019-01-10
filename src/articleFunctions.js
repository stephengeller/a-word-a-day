const axios = require("axios");
require("dotenv").config();

function randomElementFromArr(wordArr) {
  return wordArr[Math.floor(Math.random() * wordArr.length)];
}

function getRandomWordFromString(string) {
  const wordArr = string.split(" ");
  return randomElementFromArr(wordArr);
}

async function getDefinition(word) {
  const url = `https://od-api.oxforddictionaries.com/api/v1/entries/en/${word}`;
  const headers = {
    app_id: process.env.OD_APP_ID,
    app_key: process.env.OD_APP_KEY
  };
  return callAPI(url, headers, word);
}
function callAPI(url, headers, word) {
  return axios
    .get(url, { headers })
    .then(res => {
      const { lexicalEntries } = res.data.results[0];
      const definition = lexicalEntries[0].entries[0].senses[0].definitions[0];
      return Promise.resolve({ word, definition, err: false });
    })
    .catch(err => {
      console.log(`I couldn't get the definition for ${word}`);
      throw new Error(err);
    });
}

function getWordAndDefinition(articles) {
  const randomArticle = randomElementFromArr(articles)["title"];
  let randomWord = "";
  while (randomWord.length < 5 || randomWord !== randomWord.toLowerCase()) {
    randomWord = getRandomWordFromString(randomArticle);
  }
  return getDefinition(randomWord);
}

module.exports = { getWordAndDefinition };
