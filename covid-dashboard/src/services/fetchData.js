import { set } from './storage';
import { storageDataKey } from '../constants/common';
import createMainLayout from '../components/mainLayout';

const url = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases';
const fields = ['country', 'population', ['countryInfo', 'flag'], ['countryInfo', 'lat'],
  ['countryInfo', 'long'], 'cases', 'deaths', 'recovered', 'todayCases', 'todayDeaths',
  'todayRecovered', 'casesPerOneMillion', 'deathsPerOneMillion', 'recoveredPerOneMillion'];

export default function getCovidData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const nextQueryTime = new Date(year, month, date + 1);
  const ms = nextQueryTime - now;
  setTimeout(getCovidData, ms);

  fetch(url)
    .then((response) => response.json())
    .then((data) => data.map((item) => {
      const obj = {};
      fields.forEach((field) => {
        if (Array.isArray(field)) {
          const [key1, key2] = field;
          obj[key2] = item[key1][key2];
        } else if (field.match(/onemillion/i)) {
          const newField = field.replace(/onemillion/i, '100K');
          obj[newField] = Number((item[field] / 10).toFixed(2));
        } else {
          obj[field] = item[field];
        }
      });
      obj.todayCasesPer100K = relativeValue(item.todayCases, item.population);
      obj.todayDeathsPer100K = relativeValue(item.todayDeaths, item.population);
      obj.todayRecoveredPer100K = relativeValue(item.todayRecovered, item.population);
      return obj;
    }))
    .then((data) => {
      set(storageDataKey, data);
      createMainLayout(data, now);
    });
}

getCovidData();

function relativeValue(value, population) {
  return Number(((value / population) * 100000).toFixed(4));
}
