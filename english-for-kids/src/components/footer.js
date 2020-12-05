import DomBuilder from '../utilities/node_creator';

const logoLink = 'https://rs.school/js/';
const logoImg = 'icons/rs_school_js.svg';
const authorLink = 'https://github.com/rolling-scopes-school/pacetin-JS2020Q3';
const target = '_blank';
const creator = 'Palina Cetin';

export default function createFooter() {
  const footer = new DomBuilder('footer').prepend(document.body).build();
  const logo = new DomBuilder('div').class('logo').append(footer).build();
  const logoA = new DomBuilder('a').attr('href', logoLink).attr('target', target).append(logo)
    .build();
  new DomBuilder('img').attr('src', logoImg).attr('alt', 'logo').append(logoA)
    .build();
  const author = new DomBuilder('div').class('author').append(footer).build();
  new DomBuilder('span').inner('Created by:').append(author).build();
  new DomBuilder('a').attr('href', authorLink).attr('target', target).inner(creator)
    .append(author)
    .build();
  new DomBuilder('span').inner(', 2020').append(author).build();
}
