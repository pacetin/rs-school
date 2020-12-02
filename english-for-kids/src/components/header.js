import DomElementBuilder from '../utilities/node_creator';
import { showNav } from './navigation';

const dataOn = 'Play';
const dataOff = 'Train';

export default function createHeader() {
  const header = new DomElementBuilder('header')
    .prepend(document.body)
    .build();
  const burgerBtn = new DomElementBuilder('div')
    .addClass('burger-button')
    .append(header)
    .build();
  burgerBtn.addEventListener('click', showNav);
  new DomElementBuilder('img')
    .setAttr('src', 'icons/burger.svg')
    .setAttr('alt', 'burger')
    .append(burgerBtn)
    .build();
  new DomElementBuilder('h1')
    .addClass('title')
    .inner('EasyEnglish')
    .append(header)
    .build();
  const toggleCont = new DomElementBuilder('div')
    .addClass('toggle-container')
    .append(header)
    .build();
  const label = new DomElementBuilder('label')
    .addClass('toggle')
    .append(toggleCont)
    .build();
  const input = new DomElementBuilder('input')
    .setAttr('type', 'checkbox')
    .append(label)
    .build();
  input.addEventListener('change', toggleGameState);
  new DomElementBuilder('span')
    .addClass('toggle__placeholder')
    .setAttr('data-on', dataOn)
    .setAttr('data-off', dataOff)
    .append(label)
    .build();
  new DomElementBuilder('span')
    .addClass('toggle__handle')
    .append(label)
    .build();
}

function toggleGameState() {
  Array.from(document.querySelectorAll('.section')).forEach((element) => {
    element.classList.toggle('section_play-mode');
  });
  Array.from(document.querySelectorAll('.card')).forEach((element) => {
    element.classList.toggle('card_play-mode');
  });
}
