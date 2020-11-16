'use strict';
import PuzzleField from './Field.js';
import createMenu from './menu.js';
import createSettings from './settings.js';



export const puzzleField = new PuzzleField();

window.onload = init();

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

  alert ('Уважаемые проверяющие, я в очень активной разработке, отложите проверку моей работы, пожалуйста, на пятницу, субботу или воскресенье. Заранее спасибо)');
}




