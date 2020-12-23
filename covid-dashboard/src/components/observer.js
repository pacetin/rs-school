class AutoNews {
  constructor() {
    this.country = '';
    this.listeners = [];
  }

  setCountry(country) {
    this.country = country;
    this.notifyAll();
  }

  notifyAll() {
    this.listeners.forEach((subs) => subs.inform(this));
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners.filter((el) => !(el instanceof listener));
  }
}

/* class Jack {
  inform(obj) {
    console.log(`${obj}`);
  }
};

class Max {
  inform(obj) {
    console.log(`${obj}`);
  }
};

autoNews.register(new Jack());
autoNews.register(new Max());
*/

const autoNews = new AutoNews();

autoNews.setCountry('Belarus');
