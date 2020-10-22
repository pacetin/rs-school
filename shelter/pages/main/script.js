'use strict';


document.addEventListener("DOMContentLoaded", () =>{
  const blackout = document.querySelector('.blackout-background');
  blackout.addEventListener('mousedown', hideMenu);
  blackout.addEventListener('touchstart', hideMenu);
} );

function hideMenu() {  
  document.getElementById('hmt').checked = false;  
}