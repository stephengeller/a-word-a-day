const fetch = require("node-fetch");
const { get } = require("lodash");

function randomElementFromArr(wordArr) {
  return wordArr[Math.floor(Math.random() * wordArr.length)];
}

function getRandomWordFromString(string) {
  const wordArr = string.split(" ");
  return randomElementFromArr(wordArr);
}

function getDefinition(string) {
  return fetch(
    `http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
      string
    )}`
  )
    .then(response => response.json())
    .then(result => {
      const definition = get(result, "list[0].definition");

      if (!definition) {
        return Promise.reject("I don't know what that is.");
      }
      return Promise.resolve({ word: string, definition });
    })
    .catch(error => {
      console.error({ error });
      return Promise.reject("I couldn't find that out.");
    });
}

function createWordDefinitionTweet(articles) {
  const randomArticle = randomElementFromArr(articles)["title"];
  let randomWord = "";
  while (randomWord.length < 5) {
    randomWord = getRandomWordFromString(randomArticle);
  }
  return getDefinition(randomWord);
}

module.exports = {
  createWordDefinitionTweet
};
