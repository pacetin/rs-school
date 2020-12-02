import DomElementBuilder from '../utilities/node_creator';

const mainHref = '#';
const categoryHref = '#Category';

export default function createNavigation(array) {
  const nav = new DomElementBuilder('nav')
    .addClass('hamburger-menu')
    .prepend(document.body)
    .build();
  const navBtn = new DomElementBuilder('div')
    .addClass('nav-button')
    .append(nav)
    .build();
  navBtn.addEventListener('click', hideNav);
  const navIcon = new DomElementBuilder('div')
    .addClass('nav-icon')
    .append(navBtn)
    .build();
  new DomElementBuilder('span')
    .addClass('first')
    .append(navIcon)
    .build();
  new DomElementBuilder('span')
    .addClass('second')
    .append(navIcon)
    .build();
  new DomElementBuilder('span')
    .addClass('third')
    .append(navIcon)
    .build();
  const ul = new DomElementBuilder('ul')
    .addClass('list')
    .append(nav)
    .build();
  const main = new DomElementBuilder('li')
    .addClass('list__item')
    .addClass('list__item_main')
    .addClass('list__item_active')
    .setAttr('data-category', 'Main')
    .append(ul)
    .build();
  main.addEventListener('click', () => {
    window.location = mainHref;
    hideNav();
  });
  new DomElementBuilder('span')
    .addClass('list__link')
    .inner('Main')
    .append(main)
    .build();
  array.forEach((category) => {
    const li = new DomElementBuilder('li')
      .addClass('list__item')
      .setAttr('data-category', category)
      .append(ul)
      .build();
    li.addEventListener('click', () => {
      window.location = `${categoryHref}_${category}`;
      hideNav();
    });
    new DomElementBuilder('img')
      .addClass('list__icon')
      .setAttr('src', `icons/${category.toLowerCase()}.svg`)
      .setAttr('alt', category.toLowerCase())
      .append(li)
      .build();
    new DomElementBuilder('span')
      .addClass('list__link')
      .inner(category)
      .append(li)
      .build();
  });
  const overlay = new DomElementBuilder('div')
    .addClass('overlay')
    .prepend(document.body)
    .build();
  overlay.addEventListener('click', hideNav);
}

export function showNav() {
  document.querySelector('.burger-button').classList.add('burger-button_hidden');
  document.querySelector('.hamburger-menu').classList.add('hamburger-menu_active');
  document.querySelector('.nav-button').classList.add('nav-button_active');
  document.querySelector('.overlay').classList.add('overlay_active');
  document.querySelector('body').classList.add('no-scroll');
}

function hideNav() {
  document.querySelector('.burger-button').classList.remove('burger-button_hidden');
  document.querySelector('.hamburger-menu').classList.remove('hamburger-menu_active');
  document.querySelector('.nav-button').classList.remove('nav-button_active');
  document.querySelector('.overlay').classList.remove('overlay_active');
  document.querySelector('body').classList.remove('no-scroll');
}
