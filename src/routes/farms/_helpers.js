import { goto } from '@sapper/app';
import GeoJSON from 'geojson';

import * as ods from '@/plugins/ods-data';
import {
  getODSEndpoint,
  getJsonODSEndpoint,
  getRecordEndpoint,
  addQueryParamsObject,
} from '@/plugins/ods-data';

console.log(ods.privateDataset);

export const farmsBaseUrl = ods.privateDataset(
  'producteursagri',
  'bienvenue-a-la-ferme',
  'API_KEY',
);
const geojson = ods.exportFile(farmsBaseUrl, 'geojson');
export const farmsGeojsonUrl = ods.query(geojson, {
  rows: '10000',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});
export const getFarmRecord = ods.record(farmsBaseUrl);

const getDatasetURL = getODSEndpoint('producteursagri');
const datasetURL = getDatasetURL('bienvenue-a-la-ferme');
const authDataset = addQueryParamsObject(datasetURL)({ apikey: 'API_KEY' });

const fullJsonURL = getJsonODSEndpoint(datasetURL);
export const filteredJsonURL = addQueryParamsObject(fullJsonURL)({
  apikey: 'API_KEY',
  rows: '10000',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});

export const getFarmURL = getRecordEndpoint(authDataset);

export const json2geojson = (json) => {
  const flatJson = json.map((record) => ({ id: record.id, ...record.fields }));
  const geojson = GeoJSON.parse(flatJson, { Point: ['add_lat', 'add_lon'] });
  return geojson;
};

export const setActivePoint = (event) => {
  const [point] = event.detail.mapevent.features;
  goto(`/farms/${point.properties.id}`);
};

export const q2center = (coordsString) => {
  if (!coordsString) {
    return;
  }

  const lngLatStr = coordsString.split(',');
  const lng = parseFloat(lngLatStr[0]);
  const lat = parseFloat(lngLatStr[1]);
  return [lng, lat];
};

export const filterPage = (event) => {
  const url = new URL(window.location);
  const keys = Object.keys(event.detail);
  keys.forEach((key) => {
    if (event.detail[key]) {
      url.searchParams.set(key, event.detail[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  goto(url);
};
