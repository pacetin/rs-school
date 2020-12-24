import NodeBuilder from '../utilities/nodeBuilder';
import { get } from '../services/storage';
import { storageDataKey, states } from '../constants/common';
import ControlBar from '../models/ControlBar';
import Keyboard from '../models/Keyboard';
import getFieldAccordingState from '../services/usefulFunctions';

const flag = 'list__image';
const countryName = 'list__country';
const amount = 'list__amount';
export default class List {
  constructor(container) {
    this.list = container;
    this.currentCountry = undefined;
    this.currentState = ['absolute', 'cases'];
    this.listeners = [];
  }

  init(array) {
    const fragment = document.createDocumentFragment();

    const btnCont1 = new NodeBuilder('div').class('button-container button-container_list').addId('CTRL_0').app(fragment)
      .build();
    const control1 = new ControlBar(this, states[0], btnCont1);
    control1.init();
    const btnCont2 = new NodeBuilder('div').class('button-container button-container_list').addId('CTRL_1').app(fragment)
      .build();
    const control2 = new ControlBar(this, states[1], btnCont2);
    control2.init();

    const input = new NodeBuilder('input').addId('SEARCH').class('search use-keyboard-input').attr('type', 'text')
      .attr('spellcheck', 'false')
      .attr('placeholder', 'Search')
      .app(fragment)
      .build();
    input.addEventListener('input', (e) => {
      const word = e.target.value;
      const matchCountries = List.filterData(word);
      this.updateList(matchCountries);
    });

    const ul = new NodeBuilder('ul').class('list').app(fragment).build();
    ul.addEventListener('click', (e) => {
      Keyboard.close();
      this.setCountry.call(this, e);
    });
    const field = getFieldAccordingState(this.currentState);

    array.forEach((item) => {
      const li = List.createListItem(item, field);
      ul.appendChild(li);
    });

    this.list.innerHTML = '';
    this.list.appendChild(fragment);
  }

  updateList(array) {
    const fragment = document.createDocumentFragment();
    const ul = document.querySelector('.list');
    const field = getFieldAccordingState(this.currentState);

    array.forEach((item) => {
      const li = List.createListItem(item, field);
      fragment.appendChild(li);
    });

    ul.innerHTML = '';
    ul.appendChild(fragment);
  }

  static createListItem(obj, field) {
    const fragment = document.createDocumentFragment();
    const li = new NodeBuilder('li').class('list__item').app(fragment).build();
    new NodeBuilder('img').class('list__image').attr('src', obj.flag).attr('alt', 'flag')
      .app(li)
      .build();
    new NodeBuilder('span').class('list__country').inner(obj.country).app(li)
      .build();
    new NodeBuilder('span').class('list__amount').inner(`${obj[field]}`).app(li)
      .build();
    return fragment;
  }

  static filterData(word) {
    const data = get(storageDataKey);
    const regExp = new RegExp(`^${word}`, 'i');
    return data.filter((item) => item.country.match(regExp));
  }

  setCountry(e) {
    switch (e.target.getAttribute('class')) {
      case flag:
        this.currentCountry = e.target.nextElementSibling.textContent;
        break;
      case countryName:
        this.currentCountry = e.target.textContent;
        break;
      case amount:
        this.currentCountry = e.target.previousElementSibling.textContent;
        break;
      default:
        // no default case
        break;
    }
    const data = get(storageDataKey);
    const indicator = getFieldAccordingState(this.currentState);
    const sortedData = getSortedData(indicator, data);
    document.querySelector('#SEARCH').value = '';
    this.updateList(sortedData);
    this.notifyAll();
  }

  changeStateFromButton(e) {
    const controlId = e.target.parentNode.getAttribute('id').slice(-1);
    const stateElem = states[controlId];
    let index = stateElem.indexOf(this.currentState[controlId]);
    if (e.target.classList.contains('arrow-left')) {
      index = index ? index - 1 : stateElem.length - 1;
      e.target.nextSibling.value = stateElem[index];
    } else {
      index = (index !== stateElem.length - 1) ? index + 1 : 0;
      e.target.previousSibling.value = stateElem[index];
    }
    this.currentState[controlId] = stateElem[index];
    const data = get(storageDataKey);
    const indicator = getFieldAccordingState(this.currentState);
    const sortedData = getSortedData(indicator, data);
    this.updateList(sortedData);
    this.notifyAll();
  }

  changeStateFromSelect(e) {
    const controlId = e.target.parentNode.getAttribute('id').slice(-1);
    this.currentState[controlId] = e.target.value;
    const data = get(storageDataKey);
    const indicator = getFieldAccordingState(this.currentState);
    const sortedData = getSortedData(indicator, data);
    this.updateList(sortedData);
    this.notifyAll();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners.filter((el) => !(el instanceof listener));
  }

  notifyAll() {
    this.listeners.forEach((subs) => subs(this.currentCountry, this.currentState));
  }
}

function getSortedData(field, array) {
  return array.sort((a, b) => b[field] - a[field]);
}
