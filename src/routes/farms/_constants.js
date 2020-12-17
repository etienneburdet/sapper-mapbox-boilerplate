export const paint = {
  'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1, 4, 3, 10, 10, 12, 12],
  'circle-opacity': 0.8,
  'circle-color': [
    'match',
    ['get', 'categorie'],
    'Producteur',
    /*'#e693b4',*/
    [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      '#c50c66',
      '#e693b4'
    ],
    'Point de vente',
    /*'#93bbb2',*/
    [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      '#007364',
      '#93bbb2'
    ],
    '#ccc', /* other */
  ],
  'circle-stroke-width': ['interpolate', ['linear'], ['zoom'],
    1, ['case',['boolean', ['feature-state', 'active'], false], 8, 0.5],
    15, ['case',['boolean', ['feature-state', 'active'], false], 12, 2.5],
  ],
  'circle-stroke-color': [
    'match',
    ['get', 'categorie'],
    'Producteur',
    [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      '#e693b4',
      '#c50c66'
    ],
    'Point de vente',
    [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      '#93bbb2',
      '#007364'
    ],
    '#ccc', /* other */
  ],
};

export const facetsInfo = {
  familles_des_produits: {
    title: 'Type de produits',
    description: 'Tous les produits',
  },
  typologie_ods: {
    title: 'Type de service',
    description: 'Tous les services',
  },
  nom_plateforme_partenaire: {
    title: 'Partenaires',
    description: 'Tous les partenaires',
  },
};
