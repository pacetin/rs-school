window.addEventListener("load", () =>{
  let pets;
  let fullPets = [];
  let scrollTop;
  const cardWidth = 270;
  const cardHeight = 435;

  const burgerButton = document.querySelector('#burger-button'), 
    blackout = document.querySelector('.blackout-background'),
    burgerMenu = document.querySelector('.hamburger-menu'),
    logo = document.querySelector('#logo');
    prevLast = document.querySelector('#previousLast');
    prev = document.querySelector('#previous');
    page = document.querySelector('#page');
    next = document.querySelector('#next');
    nextLast = document.querySelector('#nextLast');

  burgerButton.addEventListener('click', showMenu);  //burger
  blackout.addEventListener('click', showMenu);

  prevLast.addEventListener('click', showPrevLast);    //pagination
  prev.addEventListener('click', showPrev); 
  next.addEventListener('click', showNext); 
  nextLast.addEventListener('click', showNextLast);  
  
  function showPrevLast(e) {
    let pagesNumber = 1;    
    let petsArray = fullPets.slice(0, getCardNumber());    
    showPageNumber(pagesNumber);
    createPets(petsArray);  
    next.disabled = false;
    nextLast.disabled = false;    
    previous.disabled = true;
    previousLast.disabled = true;
  }

  function showPrev(e) {
    let currentPage = Number(page.textContent);
    let cardsNumber = getCardNumber();
    let petsArray = fullPets.slice((currentPage-2)*cardsNumber, (currentPage-1)*cardsNumber);  
    showPageNumber(currentPage-1);
    createPets(petsArray);
    if (currentPage <= 2) {
      next.disabled = false;
      nextLast.disabled = false; 
      previous.disabled = true;
      previousLast.disabled = true;
    }
    if (currentPage === getPageNumber()) {
      next.disabled = false;
      nextLast.disabled = false; 
      previous.disabled = false;
      previousLast.disabled = false;
    }  
  }

  function showNext(e) {
    let currentPage = Number(page.textContent);
    let cardsNumber = getCardNumber();
    let petsArray = fullPets.slice(currentPage*cardsNumber, (currentPage+1)*cardsNumber);  
    showPageNumber(currentPage+1);
    createPets(petsArray);
    if (currentPage >= getPageNumber()-1) {
      next.disabled = true;
      nextLast.disabled = true; 
      previous.disabled = false;
      previousLast.disabled = false;
    }
    if (currentPage === 1) {
      next.disabled = false;
      nextLast.disabled = false; 
      previous.disabled = false;
      previousLast.disabled = false;
    } 
  }

  function showNextLast(e) {
    let pagesNumber = getPageNumber();
    let petsArray = fullPets.slice(-getCardNumber());    
    showPageNumber(pagesNumber);
    createPets(petsArray);  
    next.disabled = true;
    nextLast.disabled = true;    
    previous.disabled = false;
    previousLast.disabled = false;    
  }

  const getPageNumber = () => {  
    let cards = getCardNumber();
    let pages = fullPets.length/cards;
    return pages;
  }

  const getCardNumber = () => {
    let contWidth = document.querySelector('#pets').offsetWidth;
    let contHeight = document.querySelector('#pets').offsetHeight;
    let cards = Math.trunc(contWidth/cardWidth)*Math.trunc(contHeight/cardHeight);  
    return cards;
  }

  const showPageNumber = (number) => {  
    page.textContent = number;
  }
  
  async function getData() {
    const url = '../../assets/pets.json';
    const response = await fetch(url);
    pets = await response.json();       
    
    fullPets = ( () => {
      let tempArr = [];

      for (let i=0; i<6; i++) {
        const newPets = pets.slice();        

        for (let j=pets.length; j>0; j--) {
          let randomInd = Math.floor(Math.random()*j);
          const randomElem = newPets.splice(randomInd, 1)[0];
          newPets.push(randomElem);
        }

        tempArr = [...tempArr, ...newPets];
      }
      return tempArr;
    } )();

    //fullPets = sort863(fullPets);    
        
    createPets(fullPets.slice(0, 8));    
  }

  const createPets = (array) => {
    const cardsCont = document.querySelector('#pets');
    cardsCont.innerHTML = createCards(array);
    const cards = document.querySelectorAll('.card');        
    for (let i=0; i<cards.length; i++) {            
      cards[i].addEventListener('click', showPopUp);
    }
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

  const sort863 = (array) => {
    let unique8List = [];    
    for (let i=0; i<array.length/8; i++) {
      let uniqueStepList = [];

      for (let j=0; j<array.length; j++) {
        if (uniqueStepList.length >= 8) {
          break;
        }
        const isUnique = !uniqueStepList.some((item) => {
          return item.id === array[j].id;
        });
        if (isUnique) {
          uniqueStepList.push(array[j]);
          array.splice(j, 1);
          j--;
        }
      }

      unique8List = [...unique8List, ...uniqueStepList];
    }

    array = unique8List;
    array = sort6Recursively(array);
    return array;
  }

  const sort6Recursively = (array) => {    
  
    for (let i = 0; i < array.length/6; i++) {
      const stepList = array.slice(i * 6, (i * 6) + 6);
  
      for (let j = 0; j < 6; j++) {
        const duplicatedItem = stepList.find((item, ind) => {
          return item.id === stepList[j].id && (ind !== j);
        });
  
        if (duplicatedItem !== undefined) {
          const ind = (i * 6) + j;
          const which8OfList = Math.trunc(ind / 8);
  
          array.splice(which8OfList * 8, 0, array.splice(ind, 1)[0]);
  
          sort6Recursively(array);
        }
      }
    }
  
    return array;
  }

  function showMenu() {  
    burgerButton.classList.toggle('burger-button_active');
    burgerMenu.classList.toggle('hamburger-menu_active');
    logo.classList.toggle('logo_hidden');
    blackout.classList.toggle('blackout-background_active');
    document.querySelector('body').classList.toggle('no-scroll');
    document.querySelector('.header').classList.toggle('header_pos-absolute');    
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
  
  

  
  
  getData(); //!!!!!!!!!!!!!!!!!!
  



} );