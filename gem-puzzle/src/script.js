'use strict';
import PuzzleField from './Field.js';
import createMenu from './menu.js';
import createSettings from './settings.js';
import createCongrats from './congrats.js';
import createScore from './highscore.js';
import createMessage from './message.js';
import debounceSeries from './utilities/debounce.js';


export const puzzleField = new PuzzleField();

window.onload = init();
window.onresize = debounceSeries(puzzleField.resize.bind(puzzleField),1000/60,false);

function init() {
  const MENU = ['resume game', 'new game', 'settings', 'highscore'];
  puzzleField.generate();

  const gameCont = document.createElement('div');
  gameCont.classList.add('game-container');
  gameCont.append(document.querySelector('#CANVAS'));

  const menu = createMenu(MENU); 
  gameCont.append(menu);

  const settings = createSettings();
  settings.classList.add('settings-page_hidden'); 
  gameCont.append(settings);

  const congrats = createCongrats();
  congrats.classList.add('congrats-page_hidden'); 
  gameCont.append(congrats);

  const score = createScore();
  score.classList.add('score-page_hidden'); 
  gameCont.append(score);

  const message = createMessage();
  message.classList.add('message-page_hidden'); 
  gameCont.append(message);

  document.body.prepend(gameCont); 

  document.querySelector('#fieldSize').addEventListener('change', function() {
    const newSize = Number(document.querySelector('#fieldSize').value);
    puzzleField.applySettings(newSize);  
    document.querySelector('#information').textContent = 'Changes saved! Start new game to get new field size';
  });

  document.querySelector('.settings_back').addEventListener('click', () => {
    document.querySelector('.settings-page').classList.add('settings-page_hidden');
    document.querySelector('.menu').classList.remove('menu_hidden');
  });

  document.querySelector('.congrats_back').addEventListener('click', () => {
    document.querySelector('.congrats-page').classList.add('congrats-page_hidden');
    document.querySelector('.menu').classList.remove('menu_hidden');
  });

  document.querySelector('.score_back').addEventListener('click', () => {
    document.querySelector('.score-page').classList.add('score-page_hidden');
    document.querySelector('.menu').classList.remove('menu_hidden');
  });

  document.querySelector('.message_back').addEventListener('click', () => {
    document.querySelector('.message-page').classList.add('message-page_hidden');
    document.querySelector('.menu').classList.remove('menu_hidden');
  });
    
}




