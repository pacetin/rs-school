'use strict';

export default function createScore() {
  const cont = document.createElement('div');
  cont.classList.add('score-page');
  cont.innerHTML = `<h2>Highscore</h2>
    <table class="score-table" id="score">        
    <tr><th>Rank</th><th>Time</th><th>Moves</th></tr>                         
    </table> 
    <button class = "back score_back"><i class="material-icons">arrow_back</i></button>`;    
  return cont;  
}