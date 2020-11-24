export default function createSettings() {
  const cont = document.createElement('div');
  cont.classList.add('settings-page');
  cont.innerHTML = `<h2>Settings</h2>
        <p>You may choose field size:</p>
        <select id="fieldSize">
          <option value="3">3x3</option>
          <option value="4" selected>4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
          <option value="7">7x7</option>
          <option value="8">8x8</option>
        </select>
        <p id="information"></p>
        <button class = "back settings_back"><i class="material-icons">arrow_back</i></button>`;
  return cont;
}
