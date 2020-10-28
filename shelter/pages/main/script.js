'use strict';


window.addEventListener("load", () =>{
  const burgerButton = document.querySelector('#burger-button'), 
    blackout = document.querySelector('.blackout-background'),
    burgerMenu = document.querySelector('.hamburger-menu'),
    logo = document.querySelector('#logo'),
    cardsCont = document.querySelector('#cards-container'),
    prevButton = document.querySelector('#previous'),
    nextButton = document.querySelector('#next');

  let pets;
  let fullPets = [];
  let needToDeletePets = [];
  let scrollTop;
  const cardWidth = 270;
  const gap = 37.5;

  burgerButton.addEventListener('click', showMenu);        //burger
  blackout.addEventListener('click', showMenu); 

  prevButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);     //slider
  
  function showNextSlide() {
    let cardsNumber = getCardNumber();
    let newPets = createNewPetsArray(cardsNumber, fullPets);    
    appendPets(newPets);
    needToDeletePets = fullPets.slice();
    fullPets = newPets.slice();
    cardsCont.style.transform = `translateX(-${cardWidth*cardsNumber+gap*cardsNumber}px)`;
    prevButton.disabled = 'true';
    nextButton.disabled = 'true';
    cardsCont.addEventListener('transitionend', showNextSlideEnd);
  }

  function showNextSlideEnd() {
    cardsCont.removeEventListener('transitionend', showNextSlideEnd);    
    //removePets(needToDeletePets);
    prevButton.disabled = 'false';
    nextButton.disabled = 'false';
  }

  function removePets(array) {
    array.forEach( (item) => {
      let domElem = document.getElementById(item.id);
      cardsCont.removeChild(domElem);
    });
  }

  function showPreviousSlide() {
    let cardsNumber = getCardNumber();
    let newPets = createNewPetsArray(cardsNumber, fullPets);
  }
  
  

  
  
  async function getData() {
    const url = '../../assets/pets.json';
    const response = await fetch(url);
    pets = await response.json();       

    fullPets = ( () => {      
      let cardsNumber = getCardNumber();
      let newPets = createNewPetsArray(cardsNumber, undefined);      
      return newPets;    
    } )();

    //fullPets = sort863(fullPets);    
        
    createPets(fullPets);
  }

  const createNewPetsArray = (length, currentArray) => {
    let tempArr = [];
    let k=0;
    let used = {};
    let randomInd;
    let randomElem;
    if (currentArray === undefined) {      
      do {
        randomInd = Math.floor(Math.random()*pets.length);        
        if (!(randomInd in used)) {
          randomElem = pets[randomInd];
          tempArr.push(randomElem);
          k++;
          used[randomInd] = true;        
        } 
      }
      while (k < length);
    } else {        
        do {
          randomInd = Math.floor(Math.random()*pets.length);          
          if ( !(randomInd in used) && !(isRepeat(randomInd, currentArray)) ) {            
            randomElem = pets[randomInd];
            tempArr.push(randomElem);
            k++;
            used[randomInd] = true;
          }
        }        
        while (k < length);      
      
      }
    console.log(tempArr, currentArray);    
    return tempArr;
  }  

  function isRepeat(randomInd, array) {    
    return array.some( item => Number(item.id) === randomInd );    
  }

  const createPets = (array) => {    
    cardsCont.innerHTML = createCards(array);
    const cards = document.querySelectorAll('.card');        
    for (let i=0; i<cards.length; i++) {            
      cards[i].addEventListener('click', showPopUp);
    }
  }

  const appendPets = (array) => {    
    cardsCont.insertAdjacentHTML('beforeend', createCards(array));
    /*const cards = document.querySelectorAll('.card');        
    for (let i=0; i<cards.length; i++) {            
      cards[i].addEventListener('click', showPopUp);
    }*/
  }

  const createCards = (array) => {
    let str = '';
    for (let i=0; i<array.length; i++) {
      str += `<div class="card" id="${array[i].id}">            
        <img class="card__image" src="../../assets/pets-${array[i].name.toLowerCase()}.png" alt="pet's picture">
        <p class="card__title">${array[i].name}</p>
        <button type="button" class="button button_card-button">
          Learn more
        </button>
        </div>`;
    }
    return str;
  }

  const getCardNumber = () => {
    let contWidth = document.querySelector('#pets').offsetWidth;    
    let cards = Math.trunc(contWidth/cardWidth);  
    return cards;
  }

  function showMenu() {  
    burgerButton.classList.toggle('burger-button_active');
    burgerMenu.classList.toggle('hamburger-menu_active');
    logo.classList.toggle('logo_hidden');
    blackout.classList.toggle('blackout-background_active');
    document.querySelector('body').classList.toggle('no-scroll');
  }

  function showPopUp(e) {
    let index = (e.currentTarget.getAttribute('id'));    
    const modal = document.querySelector('#modal'),
      overlay = document.querySelector('.overlay');    

    modal.innerHTML = ` <button type="button" class="round-button modal-round-button" id="closePopUp">
      <svg class="arrow-icon"  width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="../../assets/sprite.svg#close" />            
      </svg>
      </button>
      <div class="pet__image" id="pet-image">      
      </div>
      <div class="pet__content">
      <h3>${pets[index].name}</h3>
      <h4><span>${pets[index].type}</span> - <span>${pets[index].breed}</span></h4>
      <p>${pets[index].description}</p>
      <ul class="pet__description">
        <li><span>Age:</span><span> ${pets[index].age}</span></li>
        <li><span>Inoculations:</span><span> ${getItemsAll(pets[index].inoculations)}</span></li>
        <li><span>Diseases:</span><span> ${getItemsAll(pets[index].diseases)}</span></li>
        <li><span>Parasites:</span><span> ${getItemsAll(pets[index].parasites)}</span></li>
      </ul>
    </div> `;

    modal.classList.add('modal_active');
    overlay.classList.add('overlay_active');
    disableScroll();

    document.querySelector('#pet-image').style.backgroundImage = `url("../../assets/pets-${pets[index].name.toLowerCase()}.png")`;    
    document.querySelector('#closePopUp').addEventListener('click', closePopUp);
    overlay.addEventListener('click', closePopUp);    
  }

  function closePopUp(e) {    
    const modal = document.querySelector('#modal'),
      overlay = document.querySelector('.overlay');

    if (e.currentTarget.getAttribute('id') === 'closePopUp') {
      document.querySelector('#closePopUp').removeEventListener('click', closePopUp); 
    } else if (e.currentTarget.getAttribute('id') === 'overlay') {
      overlay.removeEventListener('click', closePopUp);
    }    
    modal.classList.remove('modal_active');
    overlay.classList.remove('overlay_active');
    enableScroll();    
  }

  function getItemsAll(array) {    
    let string = array.reduce( (accumulator, current) => accumulator + ', ' + current);    
    return string;       
  }

  function disableScroll() {
    const body = document.querySelector('body');
    scrollTop = window.pageYOffset;

    body.classList.add('no-scroll_modal');    
    body.style.position = 'fixed';    
    body.style.top = -scrollTop + 'px';
  }

  function enableScroll() {
    const body = document.querySelector('body'); 

    body.classList.remove('no-scroll_modal');
    body.style.position = '';    
    body.style.top = '';
    window.scroll(0, scrollTop);
  }

  getData();  

  
} );


