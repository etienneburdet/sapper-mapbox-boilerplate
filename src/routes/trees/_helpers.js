import { goto } from '@sapper/app';
import GeoJson from 'geojson';

import {
  getOpendatasoftV1Endpoint,
  getOpendatasoftEndpoint,
  getJsonODSEndpoint,
  getRecordIDEndpoint,
  getFacetsEndpoint,
  addQueryParamsObject,
  addQueryParamsList,
  addWhereQuery,
  addFacetListQuery
} from '@/plugins/ods-data';

export const setActivePoint = (event) => {
  const [point] = event.detail.mapevent.features;
  goto(`/trees/${point.properties.id}`);
};

const baseUrl = getOpendatasoftEndpoint('producteursagri');
const datasetUrl = baseUrl('bienvenue-a-la-ferme');

const fullJson = getJsonODSEndpoint(datasetUrl);
export const jsonEndpoint = addQueryParamsObject(fullJson)({
  apikey: 'a7e4ed36006940138ec06146831b780b8c41b2d14719ba6da17c6148',
  rows: '10000',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});

export const getRecord = getRecordIDEndpoint(datasetUrl,'a7e4ed36006940138ec06146831b780b8c41b2d14719ba6da17c6148');

const facetsEndpoint = getFacetsEndpoint(datasetUrl);
export const getFacets = addQueryParamsList(facetsEndpoint)([
  {
    'key': 'apikey',
    'value': 'a7e4ed36006940138ec06146831b780b8c41b2d14719ba6da17c6148'
  },
  {
    'key': 'facet',
    'value': 'add_section'
  },
  {
    'key': 'facet',
    'value': 'add_code_postal'
  },
  {
    'key': 'facet',
    'value': 'type'
  }
]);

export const q2center = (coordsString) => {
  if (!coordsString) {
    return;
  }

  const lngLatStr = coordsString.split(',');
  const lng = parseFloat(lngLatStr[0]);
  const lat = parseFloat(lngLatStr[1]);
  return [lng, lat];
};

export const jsonToGeojson = (json) => {
  /* flatten api V1 output */
  json.forEach((item) => {
    Object.assign(item, item.fields);
    delete item.fields;
  });
  return GeoJson.parse(json, { 'Point': ['add_lat', 'add_lon'] });
};
