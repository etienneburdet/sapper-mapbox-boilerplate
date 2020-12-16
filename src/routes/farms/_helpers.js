import { goto } from '@sapper/app';
import * as ods from '@/plugins/ods-data';
import mapbox from 'mapbox-gl';
import { query } from '../../plugins/ods-data';

/*export const farmsBaseUrl = ods.privateDataset(
  'producteursagri',
  'bienvenue-a-la-ferme',
  'API_KEY',
);*/

export const farmsBaseUrl = ods.publicDatasetFromBase(
  'https://www.duproducteurdacote.fr',
  'flux-complet-bienvenue-a-la-ferme'
);

export const fetchGeojson = async (page) => {
  const fullGeojson = ods.exportFile(farmsBaseUrl, 'geojson');
  let whereClause = "";
  if (page && page.query) {
    const whereClauseAllowedKeys = ['familles_des_produits','typologie_ods','nom_plateforme_partenaire','search'];
    whereClause = Object.keys(page.query)
      .filter(key => whereClauseAllowedKeys.includes(key) && page.query[key])
      .reduce((str, key) => {
        str = (str.length>0?(str + " AND "):"") + (key!=='search'?(key + "="):"") + "\"" + page.query[key] + "\"";
        return str;
      }, whereClause);
  }
  const farmsGeojsonUrl = ods.query(fullGeojson, {
    rows: '10000',
    select: 'nom,adresse,nom_commune,geolocalisation',
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

/*export const farmsShortlistUrl = ods.query(farmsRecords, {
  rows: '20',
  select: 'add_lon,add_lat,add_adresse,add_nom_ferme,add_ville',
});*/

const farmsFacets = ods.facets(farmsBaseUrl);
export const farmFacetsUrl = ods.query(farmsFacets, [
  {
    'key': 'facet',
    'value': 'familles_des_produits'
  },
  {
    'key': 'facet',
    'value': 'typologie_ods'
  },
  {
    'key': 'facet',
    'value': 'nom_plateforme_partenaire'
  }
]);

export const setActivePoint = (queryparams) => (event) => {
  const [point] = event.detail.mapevent.features;
  queryparams.set('location', point.geometry.coordinates.toString());
  goto(`/farms/${point.properties.recordid}?${queryparams.toString()}`);
};

export const q2center = (coordsString) => {
  if (!coordsString) {
    return;
  }

  const lngLatStr = coordsString.split(',');
  let lngLat;
  try {
    const lng = parseFloat(lngLatStr[0]);
    const lat = parseFloat(lngLatStr[1]);
    lngLat = new mapbox.LngLat(lng, lat);
  } catch (e) {
    console.error('Wrong location param : ' + e);
  }
  return lngLat;
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

export const updateLocation = (lngLat) => {
  const url = new URL(window.location);
  if (lngLat) {
    url.searchParams.set('location', lngLat.lng + ',' + lngLat.lat);
  } else {
    url.searchParams.delete('location');
  }
  goto(url, {'replaceState':true});
};

export const filterQueryParams = (query) => {
  let queryparams = Object.assign({}, query); // don't know why, query is a reference ! not a copy
  delete queryparams['marker'];
  delete queryparams['location'];
  return new URLSearchParams(queryparams).toString();
}
