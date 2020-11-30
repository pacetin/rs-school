// import json from './assets/json';
// import woody from '@/assets/woody';
import './styles/styles.css';
import Card from '@models/Card';
import { categories, cards } from '@models/cards';
import createHeader from '@models/header';
import createFooter from '@models/footer';
import createNavigation from '@models/navigation';
import createMainSection from '@models/main_section';
import createCategory from '@models/category';

// const card = new Card('bear', woody);
// console.log('card to String', card.toString());
// console.log ('JSON:', json);

window.addEventListener('hashchange', switchToStateFromUrlHash);
const mainPage = 'Main';
const categoryPage = 'Category';
let spaState = {};

function switchToStateFromUrlHash() {
  const urlHash = window.location.hash;
  const stateStr = urlHash.substr(1);
  if (stateStr !== '') {
    if (spaState.pageName === categoryPage) {
      [spaState.pageName, spaState.categoryName] = stateStr.split('_');
    }
  } else {
    spaState = { pageName: mainPage };
  }

  switch (spaState.pageName) {
    case mainPage:
      createMainPage();
      break;
    case categoryPage:
      createCategoryPage(spaState.categoryName);
      break;

    // no default
  }
}

switchToStateFromUrlHash();

function createMainPage() {
  createFooter();
  createMainSection(categories);
  createCategoryPage('Animals');
  createHeader();
  createNavigation(categories);
}

function createCategoryPage(name) {
  const index = categories.indexOf(name);
  const categoryArray = cards[index];
  const fragment = createCategory(categoryArray);
  document.querySelector('main').appendChild(fragment);
}
