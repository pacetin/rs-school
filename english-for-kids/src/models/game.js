import { categories, cards } from '../constants/cards';

const game = {
  properties: {
    categories: 8,
    words: 8,
  },
  isStarted: false,
  section: null,
  randomWords: null,
  currentWord: null,
  mistakes: 0,

  reset() {
    this.isStarted = false;
    this.section = null;
    this.randomWords = null;
    this.currentWord = null;
    this.mistakes = 0;
  },

  generateRandomSound(string) {
    this.randomWords = [];
    const used = {};
    for (let i = 0; i < this.properties.words; i += 1) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * this.properties.words);
      }
      while (randomNum in used);
      const obj = cards[categories.indexOf(string)][randomNum];
      const { word, audioSrc } = obj;
      this.randomWords.push({ word, audioSrc });
      used[randomNum] = true;
    }
  },

  changeCurrentWord() {
    if (this.randomWords.length !== 0) {
      this.currentWord = this.randomWords.pop();
    } else {
      this.currentWord = null;
    }
  },
};

export default game;
