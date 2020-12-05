import DomBuilder from '../utilities/node_creator';

const mainHref = '#';
const categoryHref = '#Category';

export default function createNavigation(array) {
  const nav = new DomBuilder('nav').class('hamburger-menu').prepend(document.body).build();
  const navBtn = new DomBuilder('div').class('nav-button').append(nav).build();
  navBtn.addEventListener('click', hideNav);

  const navIcon = new DomBuilder('div').class('nav-icon').append(navBtn).build();
  new DomBuilder('span').class('first').append(navIcon).build();
  new DomBuilder('span').class('second').append(navIcon).build();
  new DomBuilder('span').class('third').append(navIcon).build();
  const ul = new DomBuilder('ul').class('list').append(nav).build();

  const main = new DomBuilder('li').class('list__item list__item_main list__item_active')
    .attr('data-category', 'Main')
    .append(ul)
    .build();
  main.addEventListener('click', () => {
    window.location = mainHref;
    hideNav();
  });

  new DomBuilder('span').class('list__link').inner('Main').append(main)
    .build();

  array.forEach((category) => {
    const li = new DomBuilder('li').class('list__item').attr('data-category', category)
      .append(ul)
      .build();
    li.addEventListener('click', () => {
      window.location = `${categoryHref}_${category}`;
      hideNav();
    });
    new DomBuilder('img').class('list__icon').attr('src', `icons/${category.toLowerCase()}.svg`)
      .attr('alt', category.toLowerCase())
      .append(li)
      .build();
    new DomBuilder('span').class('list__link').inner(category).append(li)
      .build();
  });

  const overlay = new DomBuilder('div').class('overlay').prepend(document.body).build();
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
