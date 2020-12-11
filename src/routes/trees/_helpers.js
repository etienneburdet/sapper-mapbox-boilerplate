import { goto } from '@sapper/app';
import {
  formDatasetUrl,
  getGeojsonEndpoint,
  getRecordsEndpoint,
  addQueryParamsList,
  addWhereQuery,
} from '@/plugins/ods-data';

export const setActivePoint = (event) => {
  const [point] = event.detail.mapevent.features;
  goto(`/trees/${point.properties.objectid}`);
};

const formDatanetworkUrl = formDatasetUrl('https://data.opendatasoft.com/api/v2/catalog/datasets/');
const treesUrl = formDatanetworkUrl('arbresremarquablesparis2011%40public');

const fullGeojson = getGeojsonEndpoint(treesUrl);
export const treesGeojsonEndpoint = addQueryParamsList(fullGeojson)({
  rows: '-1',
  select:
    'geom_x_y, objectid, adresse, libellefrancais, typeemplacement, stadedeveloppement, domanialite',
});

const treesRecordsEndpoint = getRecordsEndpoint(treesUrl);
export const getTreeRecordEndpoint = addWhereQuery(treesRecordsEndpoint);

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
  const { searchParams } = url;
  const keys = Object.keys(event.detail);
  keys.forEach((key) => (event.detail[key] ? url.searchParams.set(key, event.detail[key]) : url.searchParams.delete(key)));
  goto(url);
};
