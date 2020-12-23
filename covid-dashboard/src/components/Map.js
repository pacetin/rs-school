import polygonData from '../assets/countries.json';

const url = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases';
const L = require('../leaflet/leaflet.js');

/* eslint-disable new-cap */
const myMap = new L.map('MAP').setView([53, 28], 2);
const mapboxAccessToken = 'pk.eyJ1IjoicGFjZXRpbiIsImEiOiJja2l5aGd2NzYzb2JrMzNwM2drMGs1enYyIn0.cYc_YwCtm_PoQqzAYmYtiA';

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
  id: 'mapbox/dark-v10',
  attribution: '',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(myMap);

async function getGeoJSONData(/* { leafletElement: map } = {} */) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.log(`Failed to fetch countries: ${error.message}`, error);
    return;
  }
  const data = await response.json();
  const hasData = Array.isArray(data) && data.length > 0;
  if (!hasData) return;

  const geoJsonFeature = {
    type: 'FeatureCollection',
    features: polygonData.map((obj) => {
      const { ISO_A3: countryId } = obj.properties;
      const relatedObj = data.find((item) => item.countryInfo.iso3 === countryId);
      if (!relatedObj) return obj;
      const { country, population } = relatedObj;
      const { cases, deaths, recovered } = relatedObj;
      const { todayCases, todayDeaths, todayRecovered } = relatedObj;
      const casesPer100K = Number((relatedObj.casesPerOneMillion / 10).toFixed(2));
      const deathsPer100K = Number((relatedObj.deathsPerOneMillion / 10).toFixed(2));
      const recoveredPer100K = Number((relatedObj.recoveredPerOneMillion / 10).toFixed(2));
      const todayCasesPer100K = relativeValue(relatedObj.todayCases, obj.population);
      const todayDeathsPer100K = relativeValue(relatedObj.todayDeaths, obj.population);
      const todayRecoveredPer100K = relativeValue(relatedObj.todayRecovered, obj.population);
      return {
        properties: {
          country,
          population,
          cases,
          deaths,
          recovered,
          casesPer100K,
          deathsPer100K,
          recoveredPer100K,
          todayCases,
          todayDeaths,
          todayRecovered,
          todayCasesPer100K,
          todayDeathsPer100K,
          todayRecoveredPer100K,
        },
      };
    }),
  };

  const geoJsonLayers = new L.GeoJSON(geoJsonFeature, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      let updatedFormatted;
      let casesString;

      const {
        country,
        updated,
        cases,
        deaths,
        recovered,
      } = properties;

      casesString = `${cases}`;

      if (cases > 1000) {
        casesString = `${casesString.slice(0, -3)}k+`;
      }

      if (updated) {
        updatedFormatted = new Date(updated).toLocaleString();
      }

      const html = `
        <span class="icon-marker">
          <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>
          ${casesString}
        </span>
      `;

      return L.marker(latlng, {
        icon: L.divIcon({
          className: 'icon',
          html,
        }),
        riseOnHover: true,
      });
    },
  });

  geoJsonLayers.addTo(myMap);
}

getGeoJSONData();
function relativeValue(value, population) {
  return Number(((value / population) * 100000).toFixed(4));
}
