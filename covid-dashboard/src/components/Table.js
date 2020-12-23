import { get } from '../services/storage';
import NodeBuilder from '../utilities/nodeBuilder';
import { storageDataKey } from '../constants/common';
import ControlBar from '../models/ControlBar';

const globalIconSrc = 'virus.svg';
const states = ['absolute', 'per 100K'];

export default class Table {
  constructor(container) {
    this.container = container;
    this.global = null;
    this.selectField = undefined;
    this.currentCountry = undefined;
    this.currentState = 'absolute';
  }

  init(array) {
    this.global = Table.getGlobalValue(array);
    this.global.flag = globalIconSrc;

    const fragment = document.createDocumentFragment();

    const btnCont = new NodeBuilder('div').class('button-container button-container_table').app(fragment).build();
    const control = new ControlBar(this, states, btnCont);
    control.init();

    const country = new NodeBuilder('div').class('country').app(fragment).build();
    new NodeBuilder('img').class('flag_table').attr('src', globalIconSrc).attr('alt', 'flag')
      .app(country)
      .build();
    new NodeBuilder('span').class('country_table').inner('Global').app(country)
      .build();
    const cases = new NodeBuilder('div').class('cases').app(fragment).build();
    new NodeBuilder('p').inner('Cases').app(cases).build();
    new NodeBuilder('p').class('amount amount_cases').inner(`${this.global.cases}`).app(cases)
      .build();
    new NodeBuilder('p').class('today today_cases').inner(`+${this.global.todayCases}`).app(cases)
      .build();

    const deaths = new NodeBuilder('div').class('deaths').app(fragment).build();
    new NodeBuilder('p').inner('Deaths').app(deaths).build();
    new NodeBuilder('p').class('amount amount_deaths').inner(`${this.global.deaths}`).app(deaths)
      .build();
    new NodeBuilder('p').class('today today_deaths').inner(`+${this.global.todayDeaths}`).app(deaths)
      .build();

    const rec = new NodeBuilder('div').class('recovered').app(fragment).build();
    new NodeBuilder('p').inner('Recovered').app(rec).build();
    new NodeBuilder('p').class('amount amount_recovered').inner(`${this.global.recovered}`).app(rec)
      .build();
    new NodeBuilder('p').class('today today_recovered').inner(`+${this.global.todayRecovered}`).app(rec)
      .build();

    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }

  static getGlobalValue(array) {
    const obj = {};
    return array.reduce((accum, item) => {
      Object.keys(item).forEach((key) => {
        if (typeof item[key] === 'number') {
          if (!(key in obj)) {
            obj[key] = item[key];
          } else {
            obj[key] += item[key];
          }
        }
      });
      return obj;
    }, obj);
  }

  updateTable(country = 'Global', state) {
    const countryObj = (country === 'Global') ? this.global : get(storageDataKey).find((item) => item.country === country);

    const cases = document.querySelector('.amount_cases');
    const todayCases = document.querySelector('.today_cases');
    const deaths = document.querySelector('.amount_deaths');
    const todayDeaths = document.querySelector('.today_deaths');
    const rec = document.querySelector('.amount_recovered');
    const todayRec = document.querySelector('.today_recovered');
    const flag = document.querySelector('.flag_table');
    const countryTag = document.querySelector('.country_table');

    switch (state) {
      case states[0]:
        cases.textContent = countryObj.cases;
        todayCases.textContent = `+${countryObj.todayCases}`;
        deaths.textContent = countryObj.deaths;
        todayDeaths.textContent = `+${countryObj.todayDeaths}`;
        rec.textContent = countryObj.recovered;
        todayRec.textContent = `+${countryObj.todayRecovered}`;
        break;
      case states[1]:
        cases.textContent = `${Table.relativeValue(countryObj.cases, countryObj.population)}`;
        todayCases.textContent = `+${Table.relativeValue(countryObj.todayCases, countryObj.population)}`;
        deaths.textContent = `${Table.relativeValue(countryObj.deaths, countryObj.population)}`;
        todayDeaths.textContent = `+${Table.relativeValue(countryObj.todayDeaths, countryObj.population)}`;
        rec.textContent = `${Table.relativeValue(countryObj.recovered, countryObj.population)}`;
        todayRec.textContent = `+${Table.relativeValue(countryObj.todayRecovered, countryObj.population)}`;
        break;
      default:
        // no-default case;
        break;
    }
    flag.setAttribute('src', countryObj.flag);
    countryTag.textContent = country;
  }

  changeStateFromButton(e) {
    let index = states.indexOf(this.currentState);
    if (e.target.classList.contains('arrow-left')) {
      index = index ? index - 1 : states.length - 1;
      e.target.nextSibling.value = states[index];
    } else {
      index = (index !== states.length - 1) ? index + 1 : 0;
      e.target.previousSibling.value = states[index];
    }
    this.currentState = states[index];
    this.updateTable(this.currentCountry, this.currentState);
  }

  changeStateFromSelect(e) {
    this.currentState = e.target.value;
    this.updateTable(this.currentCountry, this.currentState);
  }

  synchronizeTable(country = 'Global', stateArray) {
    this.currentCountry = country;
    [this.currentState] = stateArray;
    this.updateTable(this.currentCountry, this.currentState);
    this.selectField.value = this.currentState;
  }

  static relativeValue(value, population) {
    return ((value / population) * 100000).toFixed(1);
  }
}
