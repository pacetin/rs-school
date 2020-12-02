import './styles/styles.css';
import { categories, cards } from './constants/cards';
import createHeader from './components/header';
import createFooter from './components/footer';
import createNavigation from './components/navigation';
import createAllCategories from './components/all_categories';
import createCategory from './components/category';
import createMain from './components/main';

const mainPage = 'Main';
const categoryPage = 'Category';
let spaState = {};

window.location = '#';

window.addEventListener('load', () => {
  createFooter();
  createMain();
  createHeader();
  createNavigation(categories);
  window.addEventListener('hashchange', switchToStateFromUrlHash);
  switchToStateFromUrlHash();
});

function switchToStateFromUrlHash() {
  const urlHash = window.location.hash;
  const stateStr = urlHash.substr(1);

  if (stateStr !== '') {
    [spaState.pageName, spaState.categoryName] = stateStr.split('_');
  } else {
    spaState = { pageName: mainPage };
  }

  switch (spaState.pageName) {
    case mainPage:
      createMainPage();
      highlightNavItem(mainPage);
      break;
    case categoryPage:
      createCategoryPage(spaState.categoryName);
      highlightNavItem(spaState.categoryName);
      break;

    // no default
  }
}

function createMainPage() {
  const fragment = createAllCategories(categories);
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(fragment);
}

function createCategoryPage(name) {
  const index = categories.indexOf(name);
  const categoryArray = cards[index];
  const fragment = createCategory(categoryArray);
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(fragment);
}

function highlightNavItem(name) {
  document.querySelector('.list__item_active').classList.remove('list__item_active');
  document.querySelector(`[data-category="${name}"]`).classList.add('list__item_active');
}
