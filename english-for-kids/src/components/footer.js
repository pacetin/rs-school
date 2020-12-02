import DomElementBuilder from '../utilities/node_creator';

const logoLink = 'https://rs.school/js/';
const logoImg = 'icons/rs_school_js.svg';
const authorLink = 'https://github.com/rolling-scopes-school/pacetin-JS2020Q3';
const target = '_blank';

export default function createFooter() {
  const footer = new DomElementBuilder('footer')
    .prepend(document.body)
    .build();
  const logo = new DomElementBuilder('div')
    .addClass('logo')
    .append(footer)
    .build();
  const logoA = new DomElementBuilder('a')
    .setAttr('href', logoLink)
    .setAttr('target', target)
    .append(logo)
    .build();
  new DomElementBuilder('img')
    .setAttr('src', logoImg)
    .setAttr('alt', 'logo')
    .append(logoA)
    .build();
  const author = new DomElementBuilder('div')
    .addClass('author')
    .append(footer)
    .build();
  new DomElementBuilder('span')
    .inner('Created by:')
    .append(author)
    .build();
  new DomElementBuilder('a')
    .setAttr('href', authorLink)
    .setAttr('target', target)
    .inner('Palina Cetin')
    .append(author)
    .build();
  new DomElementBuilder('span')
    .inner(', 2020')
    .append(author)
    .build();
}
