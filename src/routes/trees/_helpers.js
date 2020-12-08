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
  select: 'geom_x_y, objectid, arrondissement, libellefrancais',
});

const treesRecordsEndpoint = getRecordsEndpoint(treesUrl);
export const getTreeRecordEndpoint = addWhereQuery(treesRecordsEndpoint);
