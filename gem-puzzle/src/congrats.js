'use strict';

export default function createCongrats() {
  const cont = document.createElement('div');
  cont.classList.add('congrats-page');
  cont.innerHTML = `<h2>Congratulations!!!</h2>
        <p id="congratulation">You could solve this complicated puzzle for 10:25 and made just 100 moves</p>        
        <button class = "back congrats_back"><i class="material-icons">arrow_back</i></button>`;    
  return cont;  
}