'use strict';

export default function createMessage() {
  const cont = document.createElement('div');
  cont.classList.add('message-page');
  cont.innerHTML = `<p id="message">You don't have saved games, please start a new one!</p>    
    <button class = "back message_back"><i class="material-icons">arrow_back</i></button>`;    
  return cont;  
}