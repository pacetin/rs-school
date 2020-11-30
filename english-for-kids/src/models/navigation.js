import DomElementBuilder from '@models/node_creator';

const mainHref = '#';
const categoryHref = '#Category';

export default function createNavigation(array) {
  const nav = new DomElementBuilder('nav')
    .addClass('hamburger-menu')
    .prepend(document.body)
    .build();
  const ul = new DomElementBuilder('ul')
    .addClass('list')
    .append(nav)
    .build();
  const main = new DomElementBuilder('li')
    .addClass('list__item')
    .addClass('list__item_main')
    .addClass('list__item_active')
    .append(ul)
    .build();
  new DomElementBuilder('a')
    .addClass('list__link')
    .setAttr('href', mainHref)
    .inner('Main')
    .append(main)
    .build();
  array.forEach((category) => {
    const li = new DomElementBuilder('li')
      .addClass('list__item')
      .append(ul)
      .build();
    new DomElementBuilder('img')
      .addClass('list__icon')
      .setAttr('src', `icons/${category.toLowerCase()}.svg`)
      .setAttr('alt', category.toLowerCase())
      .append(li)
      .build();
    new DomElementBuilder('a')
      .addClass('list__link')
      .setAttr('href', `${categoryHref}_${category}`)
      .inner(category)
      .append(li)
      .build();
  });
}
