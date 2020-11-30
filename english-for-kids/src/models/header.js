import DomElementBuilder from '@models/node_creator';

const dataOn = 'Train';
const dataOff = 'Play';

export default function createHeader() {
  const header = new DomElementBuilder('header')
    .prepend(document.body)
    .build();
  const burgerBtn = new DomElementBuilder('div')
    .addClass('burger-button')
    .append(header)
    .build();
  const burgerIcon = new DomElementBuilder('div')
    .addClass('burger-icon')
    .append(burgerBtn)
    .build();
  new DomElementBuilder('span')
    .addClass('first')
    .append(burgerIcon)
    .build();
  new DomElementBuilder('span')
    .addClass('second')
    .append(burgerIcon)
    .build();
  new DomElementBuilder('span')
    .addClass('third')
    .append(burgerIcon)
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
  new DomElementBuilder('input')
    .setAttr('type', 'checkbox')
    .append(label)
    .build();
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
