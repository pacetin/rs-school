import List from './List';
import Table from './Table';
import Map from './Map';
import { MyChart } from './chart';
import createDate from './date';
import Keyboard from '../models/Keyboard';

const listCont = document.querySelector('.list-container');
const tableCont = document.querySelector('.table-container');
const mapCont = document.querySelector('.map-container');
const chartCont = document.querySelector('.chart-container');

export default function createMainLayout(data, date) {
  const list = new List(listCont);
  list.init(data);
  const table = new Table(tableCont);
  table.init(data);
  const map = new Map(mapCont);
  map.init(data);
  const myChart = new MyChart(chartCont);
  myChart.init(data);
  createDate(date);

  list.subscribe(table.synchronizeTable.bind(table));
  list.subscribe(map.synchronizeMap.bind(map));
  list.subscribe(myChart.synchronizeChart.bind(myChart));

  map.subscribe(table.synchronizeTable.bind(table));
  map.subscribe(list.synchronizeList.bind(list));
  map.subscribe(myChart.synchronizeChart.bind(myChart));

  myChart.subscribe(table.synchronizeTable.bind(table));
  myChart.subscribe(list.synchronizeList.bind(list));
  myChart.subscribe(map.synchronizeMap.bind(map));

  table.subscribe(map.synchronizeMap.bind(map));
  table.subscribe(list.synchronizeList.bind(list));
  table.subscribe(myChart.synchronizeChart.bind(myChart));

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
