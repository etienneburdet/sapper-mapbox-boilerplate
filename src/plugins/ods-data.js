const addPath = (path, url) => {
  const newUrl = new URL(path, url);
  newUrl.search = url.search;
  return newUrl;
};

export const dataset = (domain, dataset) => new URL(`https://${domain}.opendatasoft.com/api/v2/catalog/datasets/${dataset}`);

const apikey = (url, key) => {
  const authUrl = url;
  url.searchParams.set('apikey', key);
  return authUrl;
};

export const publicDataset = (domain, datasetName) => {
  const publicUrl = dataset(domain, datasetName);
  return publicUrl;
};

export const privateDataset = (domain, datasetName, key) => {
  const publicUrl = dataset(domain, datasetName);
  const authUrl = apikey(publicUrl, key);
  return authUrl;
};

export const exportFile = (url, exportName) => {
  const exportpath = `${url.pathname}/exports/${exportName}`;
  return addPath(exportpath, url);
};

export const records = (url) => {
  const recordsPath = `${url.pathname}/records`;
  return addPath(recordsPath, url);
};

export const record = (url) => (id) => {
  const recordPath = `${url.pathname}/records/${id}`;
  return addPath(recordPath, url);
};

export const facets = (url) => {
  const facetsPath = `${url.pathname}/facets`;
  return addPath(facetsPath, url);
};

export const query = (url, queryObject) => {
  if (!queryObject) {
    return url;
  }
  const searchParams = new URLSearchParams(url.search);
  if (Array.isArray(queryObject)) {
    queryObject.forEach((item) => {
      searchParams.append(item.key, item.value);
    });
  } else {
    Object.entries(queryObject).forEach((entry) => {
        searchParams.set(entry[0], entry[1]);
      });
  }
  const queryUrl = url;
  queryUrl.search = searchParams;
  return queryUrl;
};

export const where = (url) => (value) => {
  const queryObj = { where: value };
  const queryUrl = query(url, queryObj);
  return queryUrl;
};

// TODO remove if unecessary
// export const getODSEndpoint = (domain) => (dataset) => new URL(`https://${domain}.opendatasoft.com/api/v2/catalog/datasets/${dataset}`);
//
// export const getGeojsonEndpoint = (url) => {
//   const path = url.pathname;
//   const geojsonPath = `${path}/exports/geojson`;
//   return new URL(geojsonPath, url);
// };
//
// export const getJsonODSEndpoint = (url) => {
//   const path = url.pathname;
//   const jsonPath = `${path}/exports/jsonods`;
//   return new URL(jsonPath, url);
// };
//
// export const getRecordsEndpoint = (url) => {
//   const recordsPath = `${url.pathname}/records`;
//   const recordsUrl = new URL(recordsPath, url);
//   recordsUrl.search = url.search;
//   return recordsUrl;
// };
//
// export const getRecordEndpoint = (url) => (id) => {
//   const recordPath = `${url.pathname}/records/${id}`;
//   const recordUrl = new URL(recordPath, url);
//   recordUrl.search = url.search;
//   return recordUrl;
// };
//
// export const getFacetsEndpoint = (url) => {
//   const path = url.pathname;
//   const facetsPath = `${path}/facets`;
//   return new URL(facetsPath, url);
// };
//
// const addQueryParamToUrl = (url) => (clause) => (value) => {
//   const queryParams = new URLSearchParams(url.toString());
//   queryParams.append(clause, value);
//   const appendedUrl = new URL(url);
//   appendedUrl.search = queryParams;
//   return appendedUrl;
// };
//
// // All these functions return a function, that accepts a value as parameter
// export const addWhereQuery = (url) => addQueryParamToUrl(url)('where');
// export const addSelectQuery = (url) => addQueryParamToUrl(url)('select');
// export const addRefineQuery = (url) => addQueryParamToUrl(url)('refine');
// export const addExcludeQuery = (url) => addQueryParamToUrl(url)('exclude');
// export const addStartQuery = (url) => addQueryParamToUrl(url)('start');
// export const addRowsQuery = (url) => addQueryParamToUrl(url)('rows');
// export const addIncludeAppMetasQuery = (url) => addQueryParamToUrl(url)('include_app_metas');
// export const addTimezoneQuery = (url) => addQueryParamToUrl(url)('timezone');
//
// // More general tool to pass an array of { clause: value } params
// export const addQueryParamsObject = (url) => (queryParams) => {
//   const appendedUrl = new URL(url);
//   appendedUrl.search = new URLSearchParams(queryParams);
//   return appendedUrl;
// };
