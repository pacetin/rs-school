import DomBuilder from '../utilities/node_creator';
import { showNav } from './navigation';
import appState from '../constants/common';

const dataOn = 'Play';
const dataOff = 'Train';

export default function createHeader() {
  const header = new DomBuilder('header').prepend(document.body).build();
  const burgerBtn = new DomBuilder('div').class('burger-button').append(header).build();
  burgerBtn.addEventListener('click', showNav);
  new DomBuilder('img').attr('src', 'icons/burger.svg').attr('alt', 'burger').append(burgerBtn)
    .build();
  new DomBuilder('h1').class('title').inner('EasyEnglish').append(header)
    .build();
  const toggleCont = new DomBuilder('div').class('toggle-container').append(header).build();
  const label = new DomBuilder('label').class('toggle').append(toggleCont).build();
  const input = new DomBuilder('input').attr('type', 'checkbox').append(label).build();
  input.addEventListener('change', toggleAppState);
  new DomBuilder('span').class('toggle__placeholder').attr('data-on', dataOn).attr('data-off', dataOff)
    .append(label)
    .build();
  new DomBuilder('span').class('toggle__handle').append(label).build();
}

function toggleAppState() {
  appState.isPlay = !appState.isPlay;
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');
  const startBtn = document.querySelector('.game-button');

  if (sections.length !== 0) {
    Array.from(sections).forEach((element) => {
      element.classList.toggle('section_play-mode');
    });
  }
  if (cards.length !== 0) {
    Array.from(cards).forEach((element) => {
      element.classList.toggle('card_play-mode');
    });
  }
  if (startBtn) {
    startBtn.classList.toggle('game-button_hidden');
  }
}
