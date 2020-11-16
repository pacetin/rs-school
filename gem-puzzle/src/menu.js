'use strict';
import { puzzleField } from './script.js';
 
export default function createMenu(array) {
  const cont = document.createElement('div');    
  cont.classList.add('menu');
  const list = document.createElement('ul');
  array.forEach( (item) => {
    const li = document.createElement('li');
    li.classList.add(`${item.split(' ')[0]}`);
    li.textContent = item;
    list.append(li);
    switch(item) {
      case 'resume game':
        break;
      case 'new game':
        li.addEventListener('click', newGameHandler.bind(puzzleField));
        break;
      case 'settings':
        li.addEventListener('click', () => {
          document.querySelector('#information').textContent = '';
          document.querySelector('.settings-page').classList.remove('settings-page_hidden');
          document.querySelector('.menu').classList.add('menu_hidden');
        });
        break;
      case 'highscore':
        break;
    }
  });
  cont.append(list);
  return cont;
}

function newGameHandler() {
  document.querySelector('.menu').classList.add('menu_hidden');
  this.startNewGame();
}