import DomElementBuilder from '@models/node_creator';

export default function createMainSection(array) {
  const main = new DomElementBuilder('main')
    .prepend(document.body)
    .build();
  array.forEach((category) => {
    const section = new DomElementBuilder('div')
      .addClass('section')
      .append(main)
      .build();
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
}
