import List from './List';
import Table from './Table';
import Map from './Map';
import createDate from './date';
import Keyboard from '../models/Keyboard';

const listCont = document.querySelector('.list-container');
const tableCont = document.querySelector('.table-container');
const mapCont = document.querySelector('.map-container');

export default function createMainLayout(data, date) {
  const list = new List(listCont);
  list.init(data);
  const table = new Table(tableCont);
  table.init(data);
  const map = new Map(mapCont);
  map.init(data);
  createDate(date);
  list.subscribe(table.synchronizeTable.bind(table));

  document.querySelectorAll('.use-keyboard-input').forEach((element) => {
    element.addEventListener('focus', () => {
      Keyboard.open(element, element.value, (currentValue, cursorPos) => {
        const input = element;
        input.value = currentValue;
        input.setSelectionRange(cursorPos, cursorPos);
        const event = new Event('input');
        input.dispatchEvent(event);
      });
    });
  });
}
