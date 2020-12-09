export const formDatasetUrl = (baseUrl) => (dataset) => new URL(dataset, baseUrl);

export const getGeojsonEndpoint = (url) => {
  const path = url.pathname;
  const geojsonPath = `${path}/exports/geojson`;
  return new URL(geojsonPath, url);
};

export const getRecordsEndpoint = (url) => {
  const path = url.pathname;
  const recordsPath = `${path}/records`;
  return new URL(recordsPath, url);
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

// More general tool to pass an array of { clause: value } params
export const addQueryParamsList = (url) => (queryParams) => {
  const appendedUrl = new URL(url);
  appendedUrl.search = new URLSearchParams(queryParams);
  return appendedUrl;
};
