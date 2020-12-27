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

const autoNews = new AutoNews();

autoNews.setCountry('Belarus');
