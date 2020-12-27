import NodeBuilder from '../utilities/nodeBuilder';
import { get } from '../services/storage';
import { storageDataKey, states } from '../constants/common';
import ControlBar from '../models/ControlBar';
import { getFieldAccordingState, getSelectElement } from '../services/usefulFunctions';
import L from '../leaflet/leaflet';

const colors = [
  ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
  ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'],
  ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'],
];
const ranking = [
  [0, 1000, 10000, 100000, 500000, 1000000],
  [0, 500, 1000, 10000, 100000, 500000],
  [0, 1000, 10000, 100000, 500000, 1000000],
  [0, 100, 1000, 5000, 10000, 50000],
  [0, 10, 100, 500, 750, 1000],
  [0, 100, 1000, 5000, 10000, 25000],
];
export default class Map {
  constructor(container) {
    this.map = container;
    this.myMap = undefined;
    this.selectField = [];
    this.currentState = ['absolute', 'cases'];
    this.listeners = [];
  }

  init(array) {
    const fragment = document.createDocumentFragment();

    const btnCont1 = new NodeBuilder('div').class('button-container button-container_map').addId('CTRL_0').app(fragment)
      .build();
    const control1 = new ControlBar(this, states[0], btnCont1);
    control1.init();
    const btnCont2 = new NodeBuilder('div').class('button-container button-container_map').addId('CTRL_1').app(fragment)
      .build();
    const control2 = new ControlBar(this, states[1], btnCont2);
    control2.init();

    /* eslint-disable new-cap */
    this.myMap = new L.map('MAP').setView([12, 28], 2);
    const mapboxAccessToken = 'pk.eyJ1IjoicGFjZXRpbiIsImEiOiJja2l5aGd2NzYzb2JrMzNwM2drMGs1enYyIn0.cYc_YwCtm_PoQqzAYmYtiA';

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
      id: 'mapbox/dark-v10',
      attribution: '',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.myMap);

    this.updateMap(array);
    this.map.innerHTML = '';
    this.map.appendChild(fragment);
  }

  updateMap(array) {
    const grades = getGradeArray(this.currentState);
    const labels = getColorArray(this.currentState);
    const field = getFieldAccordingState(this.currentState);

    const geoJsonFeature = {
      type: 'FeatureCollection',
      features: array.map((item = {}) => {
        const {
          lat,
          long: lng,
          country,
        } = item;
        const obj = {
          type: 'Feature',
          properties: {
            country,
            lat,
            lng,
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        };
        obj.properties[field] = item[field];
        return obj;
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJsonFeature, {
      pointToLayer: (feature = {}, latlng) => {
        const { country } = feature.properties;
        const currentColor = getMarkerColor(feature.properties[field], grades, labels);

        const html = ` 
          <span class="popup"> 
          <h2>${country}</h2>
          <ul>
            <li><strong>${this.currentState[1]}, ${this.currentState[0]}:</strong> ${feature.properties[field]}</li>      
          </ul>
          </span>     
        `;

        const circle = new L.CircleMarker(latlng, {
          radius: 10,
          fillOpacity: 0.8,
          color: currentColor,
          fillColor: currentColor,
          weight: 1,
        });

        circle.bindPopup(
          html,
        );

        circle.on('mouseover', (e) => e.target.openPopup());
        circle.on('mouseout', (e) => e.target.closePopup());
        return circle;
      },
    });

    geoJsonLayers.addTo(this.myMap);

    const legend = L.control({ position: 'bottomright' });

    if (document.querySelector('.legend')) {
      L.DomUtil.remove(document.querySelector('.legend'));
    }

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      for (let i = 0; i < grades.length; i += 1) {
        const str = grades[i + 1] ? `-${grades[i + 1]}<br>` : '+';
        div.innerHTML += `<i style="background:${labels[i]}"></i>${grades[i]}${str}`;
      }
      return div;
    };

    legend.addTo(this.myMap);
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
    this.updateMap(data);
    this.notifyAll();
  }

  changeStateFromSelect(e) {
    const controlId = e.target.parentNode.getAttribute('id').slice(-1);
    this.currentState[controlId] = e.target.value;
    const data = get(storageDataKey);
    this.updateMap(data);
    this.notifyAll();
  }

  synchronizeMap(stateArray) {
    stateArray.forEach((item, index) => {
      if (item) {
        this.currentState[index] = item;
      }
    });
    const data = get(storageDataKey);
    const select1 = getSelectElement(this.currentState[0], this.selectField);
    const select2 = getSelectElement(this.currentState[1], this.selectField);
    [select1.value, select2.value] = this.currentState;
    this.updateMap(data);
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

function getColorArray(condition) {
  switch (condition[1]) {
    case states[1][0]:
    case states[1][3]:
      return colors[0];
    case states[1][1]:
    case states[1][4]:
      return colors[1];
    default:
      return colors[2];
  }
}

function getGradeArray(condition) {
  const isRelative = condition[0] !== 'absolute';
  const index = states[1].indexOf(condition[1]);
  return !isRelative ? ranking[index] : ranking[index].map((item) => item / 200);
}

function getMarkerColor(value, rankingArray, colorsArray) {
  for (let i = 0; i < rankingArray.length; i += 1) {
    if (value === 0) return colorsArray[0];
    if (value < rankingArray[i]) return colorsArray[i - 1];
  }
  return colorsArray[5];
}
