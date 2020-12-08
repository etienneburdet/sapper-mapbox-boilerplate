import { goto } from '@sapper/app';

export const setActivePoint = (event) => {
  const [point] = event.detail.mapevent.features;
  goto(`/items/${point.properties.objectid}`);
};
