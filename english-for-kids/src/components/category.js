import DomBuilder from '../utilities/node_creator';
import playAudio from './audio';
import appState from '../constants/common';
import { createStar, correct, error } from './star';
import createResult from './result';
import game from '../models/game';

const a = 'card';
const b = 'card_play-mode';
const c = 'game-button';
const d = 'game-button_hidden';
const correctSrc = 'audio/correct.mp3';
const errorSrc = 'audio/error.mp3';
const successSrc = 'audio/success.mp3';
const failureSrc = 'audio/failure.mp3';

export default function createCategory(array) {
  const fragment = document.createDocumentFragment();
  let cardClass;
  let buttonClass;
  if (appState.isPlay) {
    cardClass = `${a} ${b}`;
    buttonClass = c;
  } else {
    cardClass = a;
    buttonClass = `${c} ${d}`;
  }

  array.forEach((element) => {
    const card = new DomBuilder('div').class(cardClass).append(fragment).build();
    card.addEventListener('mouseleave', (e) => {
      if (!appState.isPlay) {
        if (e.target.firstChild.classList.contains('front_active')) {
          e.target.firstChild.classList.remove('front_active');
          e.target.lastChild.classList.remove('back_active');
        }
      }
    });

    const front = new DomBuilder('div').class('front').addId(element.word).append(card)
      .build();
    front.addEventListener('click', (e) => {
      if (appState.isPlay && game.isStarted) {
        if (e.currentTarget.getAttribute('id') === game.currentWord.word) {
          e.currentTarget.classList.add('front_inactive');
          playAudio(correctSrc);
          showStar(correct);
          game.changeCurrentWord();
          if (game.currentWord) {
            setTimeout(playAudio, 1000, game.currentWord.audioSrc);
          } else {
            setTimeout(showResult, 1000);
            setTimeout(() => { window.location = '#'; }, 4000);
          }
        } else {
          playAudio(errorSrc);
          game.mistakes += 1;
          showStar(error);
        }
      } else if (!appState.isPlay) {
        playAudio(element.audioSrc);
      }
    });

    const frontImg = new DomBuilder('div').class('card__image').append(front).build();
    new DomBuilder('img').attr('src', element.image).attr('alt', element.word).append(frontImg)
      .build();
    new DomBuilder('div').class('card__word').inner(element.word).append(front)
      .build();

    const cardButton = new DomBuilder('div').class('card__button').append(front).build();
    cardButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.parentNode.classList.add('front_active');
      e.target.parentNode.nextSibling.classList.add('back_active');
    });

    const back = new DomBuilder('div').class('back').append(card).build();
    const backImg = new DomBuilder('div').class('card__image').append(back).build();
    new DomBuilder('img').attr('src', element.image).attr('alt', element.word).append(backImg)
      .build();
    new DomBuilder('div').class('card__word').inner(element.translation).append(back)
      .build();
  });

  new DomBuilder('div').class('star-container').prepend(fragment).build();

  const buttonCont = new DomBuilder('div').class('button-container').append(fragment)
    .build();
  const button = new DomBuilder('button').class(buttonClass).append(buttonCont).inner('Start Game')
    .build();
  button.addEventListener('click', startGame);

  function startGame() {
    game.reset();
    game.isStarted = true;

    button.removeEventListener('click', startGame);
    button.addEventListener('click', repeatWord);
    button.classList.add('game-button_repeat');
    button.textContent = '';

    const category = window.location.hash.split('_')[1];
    game.generateRandomSound(category);

    game.changeCurrentWord();
    playAudio(game.currentWord.audioSrc);
  }

  return fragment;
}

function repeatWord() {
  if (game.currentWord) {
    playAudio(game.currentWord.audioSrc);
  }
}

function showStar(type) {
  const node = createStar(type);
  document.querySelector('.star-container').appendChild(node);
}

function showResult() {
  const fragment = createResult(game.mistakes);
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(fragment);

  if (game.mistakes !== 0) {
    playAudio(failureSrc);
  } else {
    playAudio(successSrc);
  }
}
