/***** API V1 *****/
export const getOpendatasoftV1Endpoint = (domain) => (dataset) => {
  return new URL(`https://${domain}.opendatasoft.com/explore/dataset/${dataset}`);
};

export const getDownloadV1Endpoint = (url) => {
  const path = url.pathname;
  const jsonPath = `${path}/download/`;
  return new URL(jsonPath, url);
};

// https://fpassaniti.opendatasoft.com/api/records/1.0/search/
// ?
// rows=0&
// facet=add_section&
// facet=add_code_postal&
// facet=type&
// dataset=bienvenue-a-la-ferme&

/***** API V2 *****/
export const getOpendatasoftEndpoint = (domain) => (dataset) => {
  return new URL(`https://${domain}.opendatasoft.com/api/v2/catalog/datasets/${dataset}`);
};

export const getGeojsonEndpoint = (url) => {
  const path = url.pathname;
  const geojsonPath = `${path}/exports/geojson`;
  return new URL(geojsonPath, url);
};

export const getJsonEndpoint = (url) => {
  const path = url.pathname;
  const jsonPath = `${path}/exports/json`;
  return new URL(jsonPath, url);
};

export const getJsonODSEndpoint = (url) => {
  const path = url.pathname;
  const jsonPath = `${path}/exports/jsonods`;
  return new URL(jsonPath, url);
};

export const getRecordsEndpoint = (url) => {
  const path = url.pathname;
  const recordsPath = `${path}/records`;
  return new URL(recordsPath, url);
};

export const getRecordIDEndpoint = (url, apikey) => (recordid) => {
  const path = url.pathname;
  const recordsPath = `${path}/records/${recordid}`;
  return new URL(recordsPath + (apikey ? '?apikey='+apikey: ''), url);
};

export const getFacetsEndpoint = (url) => {
  const path = url.pathname;
  const facetsPath = `${path}/facets`;
  return new URL(facetsPath, url);
};

const addQueryParamToUrl = (url) => (clause) => (value) => {
  const queryParams = new URLSearchParams(url.toString());
  queryParams.append(clause, value);
  const appendedUrl = new URL(url);
  appendedUrl.search = queryParams;
  return appendedUrl;
};

// All these functions return a function, that accepts a value as parameter
export const addWhereQuery = (url) => addQueryParamToUrl(url)('where');
export const addSelectQuery = (url) => addQueryParamToUrl(url)('select');
export const addRefineQuery = (url) => addQueryParamToUrl(url)('refine');
export const addExcludeQuery = (url) => addQueryParamToUrl(url)('exclude');
export const addStartQuery = (url) => addQueryParamToUrl(url)('start');
export const addRowsQuery = (url) => addQueryParamToUrl(url)('rows');
export const addIncludeAppMetasQuery = (url) => addQueryParamToUrl(url)('include_app_metas');
export const addTimezoneQuery = (url) => addQueryParamToUrl(url)('timezone');
export const addFacetListQuery = (url) => addQueryParamToUrl(url)('facet');

// More general tool to pass an array of { clause: value } params
export const addQueryParamsObject = (url) => (queryParams) => {
  const appendedUrl = new URL(url);
  appendedUrl.search = new URLSearchParams(queryParams);
  return appendedUrl;
};
export const addQueryParamsList = (url) => (queryParams) => {
  const appendedUrl = new URL(url);
  let newSearchParams = new URLSearchParams();
  queryParams.forEach((param) => {
    newSearchParams.append(param.key, param.value);
  });
  appendedUrl.search = newSearchParams;
  return appendedUrl;
};
