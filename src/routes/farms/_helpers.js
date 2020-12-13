import { goto } from '@sapper/app';

import * as ods from '@/plugins/ods-data';
// import {
//   getODSEndpoint,
//   getJsonODSEndpoint,
//   getRecordEndpoint,
//   addQueryParamsObject,
// } from '@/plugins/ods-data';

export const farmsBaseUrl = ods.privateDataset(
  'producteursagri',
  'bienvenue-a-la-ferme',
  'API_KEY',
);

const fullGeojson = ods.exportFile(farmsBaseUrl, 'geojson');
export const farmsGeojsonUrl = ods.query(fullGeojson, {
  rows: '10000',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});

const farmsRecords = ods.records(farmsBaseUrl);
export const getFarmWhere = ods.where(farmsRecords);

export const farmsShortlistUrl = ods.query(farmsRecords, {
  rows: '20',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});

// const getDatasetURL = getODSEndpoint('producteursagri');
// const datasetURL = getDatasetURL('bienvenue-a-la-ferme');
// const authDataset = addQueryParamsObject(datasetURL)({ apikey: 'API_KEY' });
//
// const fullJsonURL = getJsonODSEndpoint(datasetURL);
// export const filteredJsonURL = addQueryParamsObject(fullJsonURL)({
//   apikey: 'API_KEY',
//   rows: '10000',
//   select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
// });
//
// export const getFarmURL = getRecordEndpoint(authDataset);

// export const json2geojson = (json) => {
//   const flatJson = json.map((record) => ({ id: record.id, ...record.fields }));
//   const geojson = GeoJSON.parse(flatJson, { Point: ['add_lat', 'add_lon'] });
//   return geojson;
// };

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
