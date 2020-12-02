import DomElementBuilder from '../utilities/node_creator';

export default function createAllCategories(array) {
  const fragment = document.createDocumentFragment();
  array.forEach((category) => {
    const section = new DomElementBuilder('div')
      .addClass('section')
      .append(fragment)
      .build();
    section.addEventListener('click', () => {
      window.location.hash = `Category_${category}`;
    });
    const sectionImg = new DomElementBuilder('div')
      .addClass('section__image')
      .append(section)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', `img/${category.toLowerCase()}.jpg`)
      .setAttr('alt', category.toLowerCase())
      .append(sectionImg)
      .build();
    new DomElementBuilder('div')
      .addClass('section__title')
      .inner(category)
      .append(section)
      .build();
  });
  return fragment;
}
