'use strict';
const languages = {
  'en' : [
    {small: '`', shift: '~', code: 'Blackquote'},
    {small: '1', shift: '!', code: 'Digit1'},
    {small: '2', shift: '@', code: 'Digit2'},
    {small: '3', shift: '#', code: 'Digit3'},
    {small: '4', shift: '$', code: 'Digit4'},
    {small: '5', shift: '%', code: 'Digit5'},
    {small: '6', shift: '^', code: 'Digit6'},
    {small: '7', shift: '&', code: 'Digit7'},
    {small: '8', shift: '*', code: 'Digit8'},
    {small: '9', shift: '(', code: 'Digit9'},
    {small: '0', shift: ')', code: 'Digit0'},
    {small: '-', shift: '_', code: 'Minus'},
    {small: '=', shift: '+', code: 'Equal'},
    {small: 'Backspace', shift: null, code: 'Backspace'},
    {small: 'q', shift: 'Q', code: 'KeyQ'},
    {small: 'w', shift: 'W', code: 'KeyW'},
    {small: 'e', shift: 'E', code: 'KeyE'},
    {small: 'r', shift: 'R', code: 'KeyR'},
    {small: 't', shift: 'T', code: 'KeyT'},
    {small: 'y', shift: 'Y', code: 'KeyY'},
    {small: 'u', shift: 'U', code: 'KeyU'},
    {small: 'i', shift: 'I', code: 'KeyI'},
    {small: 'o', shift: 'O', code: 'KeyO'},
    {small: 'p', shift: 'P', code: 'KeyP'},
    {small: '[', shift: '{', code: 'BracketLeft'},
    {small: ']', shift: '}', code: 'BracketRight'},
    {small: '\\', shift: '|', code: 'BackSlash'},
    {small: 'CapsLock', shift: null, code: 'CapsLock'},
    {small: 'a', shift: 'A', code: 'KeyA'},
    {small: 's', shift: 'S', code: 'KeyS'},
    {small: 'd', shift: 'D', code: 'KeyD'},
    {small: 'f', shift: 'F', code: 'KeyF'},
    {small: 'g', shift: 'G', code: 'KeyG'},
    {small: 'h', shift: 'H', code: 'KeyH'},
    {small: 'j', shift: 'J', code: 'KeyJ'},
    {small: 'k', shift: 'K', code: 'KeyK'},
    {small: 'l', shift: 'L', code: 'KeyL'},
    {small: ';', shift: ':', code: 'Semicolon'},
    {small: "'", shift: '"', code: 'Apostrophe'},
    {small: 'Enter', shift: null, code: 'Enter'},
    {small: 'Done', shift: null, code: 'Done'},
    {small: 'z', shift: 'Z', code: 'KeyZ'},
    {small: 'x', shift: 'X', code: 'KeyX'},
    {small: 'c', shift: 'C', code: 'KeyC'},
    {small: 'v', shift: 'V', code: 'KeyV'},
    {small: 'b', shift: 'B', code: 'KeyB'},
    {small: 'n', shift: 'N', code: 'KeyN'},
    {small: 'm', shift: 'M', code: 'KeyM'},
    {small: ',', shift: '<', code: 'Comma'},
    {small: '.', shift: '>', code: 'FullStop'},
    {small: '/', shift: '?', code: 'Solidus'},
    {small: 'Shift', shift: null, code: 'Shift'},
    {small: 'En', shift: null, code: 'Language'},
    {small: 'Microphone', shift: null, code: 'Microphone'},
    {small: 'Sound', shift: null, code: 'Sound'},
    {small: ' ', shift: ' ', code: 'Space'},
    {small: 'ArrowLeft', shift: null, code: 'ArrowLeft'},
    {small: 'ArrowRight', shift: null, code: 'ArrowRight'},  
  ],
  'ru' : [
    {small: 'ё', shift: 'Ё', code: 'Blackquote'},
    {small: '1', shift: '!', code: 'Digit1'},
    {small: '2', shift: '"', code: 'Digit2'},
    {small: '3', shift: '№', code: 'Digit3'},
    {small: '4', shift: ';', code: 'Digit4'},
    {small: '5', shift: '%', code: 'Digit5'},
    {small: '6', shift: ':', code: 'Digit6'},
    {small: '7', shift: '?', code: 'Digit7'},
    {small: '8', shift: '*', code: 'Digit8'},
    {small: '9', shift: '(', code: 'Digit9'},
    {small: '0', shift: ')', code: 'Digit0'},
    {small: '-', shift: '_', code: 'Minus'},
    {small: '=', shift: '+', code: 'Equal'},
    {small: 'Backspace', shift: null, code: 'Backspace'},
    {small: 'й', shift: 'Й', code: 'KeyQ'},
    {small: 'ц', shift: 'Ц', code: 'KeyW'},
    {small: 'у', shift: 'У', code: 'KeyE'},
    {small: 'к', shift: 'К', code: 'KeyR'},
    {small: 'е', shift: 'Е', code: 'KeyT'},
    {small: 'н', shift: 'Н', code: 'KeyY'},
    {small: 'г', shift: 'Г', code: 'KeyU'},
    {small: 'ш', shift: 'Ш', code: 'KeyI'},
    {small: 'щ', shift: 'Щ', code: 'KeyO'},
    {small: 'з', shift: 'З', code: 'KeyP'},
    {small: 'х', shift: 'Х', code: 'BracketLeft'},
    {small: 'ъ', shift: 'Ъ', code: 'BracketRight'},
    {small: '\\', shift: '/', code: 'BackSlash'},
    {small: 'CapsLock', shift: null, code: 'CapsLock'},
    {small: 'ф', shift: 'Ф', code: 'KeyA'},
    {small: 'ы', shift: 'Ы', code: 'KeyS'},
    {small: 'в', shift: 'В', code: 'KeyD'},
    {small: 'а', shift: 'А', code: 'KeyF'},
    {small: 'п', shift: 'П', code: 'KeyG'},
    {small: 'р', shift: 'Р', code: 'KeyH'},
    {small: 'о', shift: 'О', code: 'KeyJ'},
    {small: 'л', shift: 'Л', code: 'KeyK'},
    {small: 'д', shift: 'Д', code: 'KeyL'},
    {small: 'ж', shift: 'Ж', code: 'Semicolon'},
    {small: "э", shift: 'Э', code: 'Apostrophe'},
    {small: 'Enter', shift: null, code: 'Enter'},
    {small: 'Done', shift: null, code: 'Done'},
    {small: 'я', shift: 'Я', code: 'KeyZ'},
    {small: 'ч', shift: 'Ч', code: 'KeyX'},
    {small: 'с', shift: 'С', code: 'KeyC'},
    {small: 'м', shift: 'М', code: 'KeyV'},
    {small: 'и', shift: 'И', code: 'KeyB'},
    {small: 'т', shift: 'Т', code: 'KeyN'},
    {small: 'ь', shift: 'Ь', code: 'KeyM'},
    {small: 'б', shift: 'Б', code: 'Comma'},
    {small: 'ю', shift: 'Ю', code: 'FullStop'},
    {small: '.', shift: ',', code: 'Solidus'},
    {small: 'Shift', shift: null, code: 'Shift'},
    {small: 'En', shift: null, code: 'Language'},
    {small: 'Microphone', shift: null, code: 'Microphone'},
    {small: 'Sound', shift: null, code: 'Sound'},
    {small: ' ', shift: ' ', code: 'Space'},
    {small: 'ArrowLeft', shift: null, code: 'ArrowLeft'},
    {small: 'ArrowRight', shift: null, code: 'ArrowRight'},  
  ]  
};

function getFromStorage(name, subst = null) {
  return JSON.parse(window.localStorage.getItem(name || subst));
}

function setToStorage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

function create(el, classNames, child, parent, ...dataAttr) {
  let element = null;
  try{
    element = document.createElement(el);
  } catch (error) {
    throw new Error ('Unable to create HTMLElement! Give a proper tag name');
  }

  if (classNames) element.classList.add(...classNames.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach( (childItem) => childItem && element.appendChild(childItem));
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (dataAttr.length) {
    dataAttr.forEach( ([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      } else if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    } );
  }
  return element;
}

const rowsOrder = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'BackSlash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Apostrophe', 'Enter'],
  ['Done', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'FullStop', 'Solidus', 'Shift'],
  ['Language', 'Microphone', 'Sound', 'Space', 'ArrowLeft', 'ArrowRight']
];

const lang = get('keyBoardLang', '"ru"');

class Key {
  constructor({}) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    this.isFnKey = Boolean(code.match(/BackSp|Caps|Enter|Done|Shift|Lang|Micro|Sound|Arrow/));
    
    if (this.shift) {
      this.sub = create('div', 'sub', this.shift);
    } else {
      this.sub = create('div', 'sub', '');
    }

    this.letter = create('div', 'letter', this.small);
    this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code]);
  }
}

class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keyPressed = {};
    this.isCaps = false;
  }

  init(langCode) {
    this.keyBase = languages[langCode];
    this.container = create('div', 'keyboard', null, main, ['language', langCode]);
    document.body.prepend(main);
    return this;
  }

  generateLayout() {
    this.keyButtons = [];
    this.rowsOrder.forEach ( (row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i+1]);
      row.forEach( (code) => {
        const keyObj = this.keyBase.find( (key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
        }
      } )
    } )
    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
  }
  
  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    const {code, type} = e;
    
  }
}

window.addEventListener('DOMContentLoaded', function () {
  new Keyboard(rowsOrder).init(lang).generateLayout();  
});

