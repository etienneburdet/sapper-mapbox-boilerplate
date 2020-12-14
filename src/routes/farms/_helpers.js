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

/*
const fullGeojson = ods.exportFile(farmsBaseUrl, 'geojson');
export const farmsGeojsonUrl = ods.query(fullGeojson, {
  rows: '10000',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});
*/

/*const json2geojson = (json) => {
  const geojson = {
    type: 'FeatureCollection',
    features: [],
  };
  const features = json.map((record) => {
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [record.fields.add_lon, record.fields.add_lat],
      },
      properties: {
        id: record.id,
        add_adresse: record.fields.add_adresse,
        add_nom_ferme: record.fields.add_nom_ferme,
        add_ville: record.fields.add_ville,
      },
    };
    return feature;
  });
  geojson.features = features;
  return geojson;
};

export const fetchGeojson = async () => {
  const fullJsonods = ods.exportFile(farmsBaseUrl, 'jsonods');
  const farmsJsonodsUrl = ods.query(fullJsonods, {
    rows: '10000',
    select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
  });
  const resFromAPI = await fetch(farmsJsonodsUrl);
  const farmsJson = await resFromAPI.json();
  const farmGeojson = await json2geojson(farmsJson);
  return farmGeojson;
};*/

export const fetchGeojson = async () => {
  const fullGeojson = ods.exportFile(farmsBaseUrl, 'geojson');
  const farmsGeojsonUrl = ods.query(fullGeojson, {
    rows: '10000',
    select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville,location',
    record_metas: true
  });
  const resFromAPI = await fetch(farmsGeojsonUrl);
  const farmsGeojson = await resFromAPI.json();
  return farmsGeojson;
};

export const getFarmRecord = ods.record(farmsBaseUrl);

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

export const setActivePoint = (event) => {
  const [point] = event.detail.mapevent.features;
  goto(`/farms/${point.properties.recordid}`);
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
