'use strict';
import { puzzleField } from './script.js';
import * as storage from './storage.js';
 
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
        li.addEventListener('click', resumeGameHandler.bind(puzzleField));        
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
        li.addEventListener('click', () => {
          const score = storage.get('Рекорд');
          if (score) {
            document.querySelector('.score-table').innerHTML = '';          
            document.querySelector('.score-table').insertAdjacentHTML('beforeend', `<tr><th>Rank</th><th>Time</th><th>Moves</th></tr>`);
            score.forEach((item, index) => {              
              document.querySelector('.score-table').insertAdjacentHTML('beforeend', `<tr><th>${index+1}</th><th>${item.time}</th><th>${item.moves}</th></tr>`);
            })            
          }
          document.querySelector('.score-page').classList.remove('score-page_hidden');
          document.querySelector('.menu').classList.add('menu_hidden');
        });
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

function resumeGameHandler() {
  document.querySelector('.menu').classList.add('menu_hidden');
  if (!storage.get('Пятнашки')) {
    document.querySelector('.message-page').classList.remove('message-page_hidden');
    document.querySelector('#message').textContent = "You don't have saved games, please start a new one!"
  } else {
    this.resumeGame();
  }
  
  
  
}

