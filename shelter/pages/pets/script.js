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
    document.querySelector('.header').classList.toggle('header_pos-absolute');    
  } 
} );