export default {
  "circle-radius": [
    "interpolate",
    ["linear"],
    ["zoom"],
    8,
    1,
    15,
    2,
    19,
    6,
    22,
    10
  ],
  "circle-opacity": 0.8,
  "circle-color": [
    "match",
    ["get", "stadedeveloppement"],
    "A",
    "#317256",
    "J",
    "#398564",
    "JA",
    "#419873",
    "M",
    "#49ab81",
    /* other */ "#52bf90"
  ]
};
