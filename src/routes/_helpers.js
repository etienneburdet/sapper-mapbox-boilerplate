export const ActivePoint = (event) => event.detail.mapevent.features[0];

export const filterQueriedPoint = (data, queryId) => {
  if (queryId.lenght < 0) {
    return undefined;
  }

  const point = data.filter((feature) => feature.objectid === queryId);
  return point;
};
