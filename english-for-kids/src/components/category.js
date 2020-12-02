import DomElementBuilder from '../utilities/node_creator';
import playAudio from './audio';

export default function createCategory(array) {
  const fragment = document.createDocumentFragment();
  array.forEach((element) => {
    const card = new DomElementBuilder('div')
      .addClass('card')
      .append(fragment)
      .build();
    card.addEventListener('mouseleave', (e) => {
      if (e.target.firstChild.classList.contains('front_active')) {
        e.target.firstChild.classList.remove('front_active');
        e.target.lastChild.classList.remove('back_active');
      }
    });

    const front = new DomElementBuilder('div')
      .addClass('front')
      .addId(element.word)
      .append(card)
      .build();
    front.addEventListener('click', () => {
      playAudio(element.audioSrc);
    });

    const frontImg = new DomElementBuilder('div')
      .addClass('card__image')
      .append(front)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', element.image)
      .setAttr('alt', element.word)
      .append(frontImg)
      .build();
    new DomElementBuilder('div')
      .addClass('card__word')
      .inner(element.word)
      .append(front)
      .build();

    const cardButton = new DomElementBuilder('div')
      .addClass('card__button')
      .append(front)
      .build();
    cardButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.parentNode.classList.add('front_active');
      e.target.parentNode.nextSibling.classList.add('back_active');
    });

    const back = new DomElementBuilder('div')
      .addClass('back')
      .append(card)
      .build();
    const backImg = new DomElementBuilder('div')
      .addClass('card__image')
      .append(back)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', element.image)
      .setAttr('alt', element.word)
      .append(backImg)
      .build();
    new DomElementBuilder('div')
      .addClass('card__word')
      .inner(element.translation)
      .append(back)
      .build();
  });
  return fragment;
}
