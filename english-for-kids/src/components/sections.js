import DomBuilder from '../utilities/node_creator';
import appState from '../constants/common';
import game from '../models/game';

const a = 'section';
const b = 'section_play-mode';

export default function createAllCategories(array) {
  const fragment = document.createDocumentFragment();
  let sectionClass;
  if (appState.isPlay) {
    sectionClass = `${a} ${b}`;
  } else {
    sectionClass = a;
  }

  array.forEach((category) => {
    const section = new DomBuilder('div').class(sectionClass).append(fragment).build();
    section.addEventListener('click', () => {
      game.category = category;
      window.location.hash = `Category_${category}`;
    });

    const sectionImg = new DomBuilder('div').class('section__image').append(section).build();
    new DomBuilder('img').attr('src', `img/${category.toLowerCase()}.jpg`)
      .attr('alt', category.toLowerCase())
      .append(sectionImg)
      .build();
    new DomBuilder('div').class('section__title').inner(category).append(section)
      .build();
  });

  return fragment;
}
