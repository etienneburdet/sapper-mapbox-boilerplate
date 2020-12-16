export const paint = {
  'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 4, 15, 10, 22, 15],
  'circle-opacity': 0.8,
  'circle-color': '#54BFB2',
  'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 8, 1, 15, 2],
  'circle-stroke-color': '#000',
};

/* export const inner = {
  'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 6, 15, 12, 22, 15],
  'circle-opacity': 0.8,
  'circle-color': [
    'match',
    ['get', 'stadedeveloppement'],
    'A',
    '#317256',
    'J',
    '#398564',
    'JA',
    '#419873',
    'M',
    '#49ab81',
    /!* other *!/ '#52bf90',
  ],
}; */

export const facetsInfo = {
  typologie_ods: {
    title: 'Type de service',
  },
  familles_des_produits: {
    title: 'Type de produits',
  },
  nom_plateforme_partenaire: {
    title: 'Partenaires',
  },
};
