'use strict';


window.addEventListener("DOMContentLoaded", () =>{
  const burgerButton = document.querySelector('#burger-button'), 
    blackout = document.querySelector('.blackout-background'),
    burgerMenu = document.querySelector('.hamburger-menu'),
    logo = document.querySelector('#logo');
  burgerButton.addEventListener('click', showMenu);  
  blackout.addEventListener('click', showMenu); 
  
  function showMenu() {  
    burgerButton.classList.toggle('burger-button_active');
    burgerMenu.classList.toggle('hamburger-menu_active');
    logo.classList.toggle('logo_hidden');
    blackout.classList.toggle('blackout-background_active');
    document.querySelector('body').classList.toggle('no-scroll');
  }

  let pets;
  let scrollTop;
  
  async function getData() {
    const url = '../../assets/pets.json';
    const response = await fetch(url);
    pets = await response.json();
    console.log (pets);

    const cards = document.querySelectorAll('.card');
    console.log(cards);
    for (let i=0; i<cards.length; i++) {
      cards[i].addEventListener('click', showPopUp);
    }
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


