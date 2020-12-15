import { goto } from '@sapper/app';
import * as ods from '@/plugins/ods-data';

export const farmsBaseUrl = ods.privateDataset(
  'producteursagri',
  'bienvenue-a-la-ferme',
  'API_KEY',
);

/*export const farmsBaseUrl = ods.publicDataset(
  'producteursagri',
  'bienvenue-a-la-ferme'
);*/

export const fetchGeojson = async (page) => {
  const fullGeojson = ods.exportFile(farmsBaseUrl, 'geojson');
  let whereClause = "add_nom_ferme is not null";
  if (page && page.query) {
    const whereClauseAllowedKeys = ['add_section','cat_iphone','type','search'];
    whereClause = Object.keys(page.query)
      .filter(key => whereClauseAllowedKeys.includes(key))
      .reduce((str, key) => {
        str = str + " AND " + (key!=='search'?(key + "="):"") + "\"" + page.query[key] + "\"";
        return str;
      }, whereClause);
  }
  const farmsGeojsonUrl = ods.query(fullGeojson, {
    rows: '10000',
    select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville,location',
    where: whereClause,
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

const farmsFacets = ods.facets(farmsBaseUrl);
export const farmFacetsUrl = ods.query(farmsFacets, [
  {
    'key': 'facet',
    'value': 'add_section'
  },
  {
    'key': 'facet',
    'value': 'cat_iphone'
  },
  {
    'key': 'facet',
    'value': 'type'
  }
]);

export const setActivePoint = (querystring) => (event) => {
  const [point] = event.detail.mapevent.features;
  console.log(querystring);
  goto(`/farms/${point.properties.recordid}?${querystring}`);
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

export const searchPage = (search) => {
  const url = new URL(window.location);
  const searchquery = search.target.value;
  if (searchquery) {
    url.searchParams.set('search', search.target.value);
  } else {
    url.searchParams.delete('search');
  }
  goto(url);
};
