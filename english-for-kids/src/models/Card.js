export default class Card {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  toString() {
    return JSON.stringify({ name: this.name, img: this.img });
  }
}
