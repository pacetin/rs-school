import NodeBuilder from '../utilities/nodeBuilder';
import { get } from '../services/storage';
import { storageDataKey, states } from '../constants/common';
import ControlBar from '../models/ControlBar';
import { getSelectElement } from '../services/usefulFunctions';

const Chart = require('chart.js');

let obj;
let date;
let kol;

let globalInfoDay;

const urlGlobalDay = 'https://disease.sh/v3/covid-19/historical/all?lastdays=400';

export default async function globalInfo() {
  const resultGlobalDay = await fetch(urlGlobalDay);
  const dataGlobalDay = await resultGlobalDay.json();
  globalInfoDay = dataGlobalDay;
  obj = globalInfoDay.cases;
  date = Object.keys(obj);
  kol = Object.values(obj);
  a();
}

function a() {
  const loaderDel = document.querySelector('.del');
  loaderDel.innerHTML = '';

  const ctx = document.getElementById('chart').getContext('2d');

  const chartConfig = {
    type: 'bar',
    data: {
      labels: date,
      datasets: [],
    },
    options: {
      title: {
        display: true,
        text: 'Daily Cases',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false,
          },
        }],
      },
    },
  };

  const chart = new Chart(ctx, chartConfig);

  const newVal = {
    label: '',
    data: kol,
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 2,
    fill: false,
  };

  chartConfig.data.datasets.push(newVal);

  chart.update();
}

globalInfo();

export class MyChart {
  constructor(container) {
    this.chart = container;
    this.selectField = [];
    this.currentState = ['absolute', 'cases'];
    this.listeners = [];
  }

  init(array) {
    const fragment = document.createDocumentFragment();

    const btnCont1 = new NodeBuilder('div').class('button-container button-container_chart').addId('CTRL_0').app(fragment)
      .build();
    const control1 = new ControlBar(this, states[0], btnCont1);
    control1.init();
    const btnCont2 = new NodeBuilder('div').class('button-container button-container_chart').addId('CTRL_1').app(fragment)
      .build();
    const control2 = new ControlBar(this, states[1], btnCont2);
    control2.init();

    this.updateChart(array);
    this.chart.prepend(fragment);
  }

  /* eslint-disable class-methods-use-this */
  updateChart() {
  }

  changeStateFromButton(e) {
    const controlId = e.target.parentNode.getAttribute('id').slice(-1);
    const stateElem = states[controlId];
    let index = stateElem.indexOf(this.currentState[controlId]);
    if (e.target.classList.contains('arrow-left')) {
      index = index ? index - 1 : stateElem.length - 1;
      e.target.nextSibling.value = stateElem[index];
    } else {
      index = (index !== stateElem.length - 1) ? index + 1 : 0;
      e.target.previousSibling.value = stateElem[index];
    }
    this.currentState[controlId] = stateElem[index];
    this.currentState[controlId] = stateElem[index];
    const data = get(storageDataKey);
    this.updateChart(data);
    this.notifyAll();
  }

  changeStateFromSelect(e) {
    const controlId = e.target.parentNode.getAttribute('id').slice(-1);
    this.currentState[controlId] = e.target.value;
    const data = get(storageDataKey);
    this.updateChart(data);
    this.notifyAll();
  }

  synchronizeChart(stateArray) {
    stateArray.forEach((item, index) => {
      if (item) {
        this.currentState[index] = item;
      }
    });
    const data = get(storageDataKey);
    const select1 = getSelectElement(this.currentState[0], this.selectField);
    const select2 = getSelectElement(this.currentState[1], this.selectField);
    [select1.value, select2.value] = this.currentState;
    this.updateChart(data);
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners.filter((el) => !(el instanceof listener));
  }

  notifyAll() {
    this.listeners.forEach((subs) => subs(this.currentState, this.currentCountry));
  }
}
