import DomElementBuilder from '@models/node_creator';

const buttonSrc = 'icons/rotation_button.svg';

export default function createCategory(array) {
  const fragment = document.createDocumentFragment();
  array.forEach((element) => {
    const card = new DomElementBuilder('div')
      .addClass('card')
      .append(fragment)
      .build();
    const front = new DomElementBuilder('div')
      .addClass('front')
      .append(card)
      .build();
    const frontImg = new DomElementBuilder('div')
      .addClass('card__image')
      .append(front)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', `img/${element.word}.jpg`)
      .setAttr('alt', element.word)
      .append(frontImg)
      .build();
    new DomElementBuilder('div')
      .addClass('card__word')
      .inner(element.word)
      .append(front)
      .build();
    const button = new DomElementBuilder('button')
      .addClass('card__button')
      .append(front)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', buttonSrc)
      .setAttr('alt', 'rotation_button')
      .append(button)
      .build();
    const back = new DomElementBuilder('div')
      .addClass('back')
      .append(card)
      .build();
    const backImg = new DomElementBuilder('div')
      .addClass('card__image')
      .append(back)
      .build();
    new DomElementBuilder('img')
      .setAttr('src', `img/${element.word}.jpg`)
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

/* <div class="card">
      <div class="front">
        <div class="card__image"></div>
        <div class="card__word">Giraffe</div>
        <button class="card__button">
          <img src="icons/rotation_button.svg" alt="rotation_button">  
        </button>
      </div>
      <div class="back">
        <div class="card__image"></div>
        <div class="card__word">Жираф</div>
      </div>
    </div> */