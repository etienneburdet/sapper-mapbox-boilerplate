<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte';

  const { getMap } = getContext('map');
  const map = getMap();

  const { getMapSourceId } = getContext('source');
  const source = getMapSourceId();

  export let type;
  export let paint = {};
  export let layout = {};
  export let id = 'layerId';

  let delayedRenderTimer;

  const dispatch = createEventDispatcher();
  const dispatchLayerEvent = (event) => {
    dispatch('mapClick', {
      map,
      layerId: id,
      mapevent: event,
    });
  };

  const currentLayer = { layers: [id] };

  const debounce = (func, tempo) => () => {
    if (delayedRenderTimer) {
      clearTimeout(delayedRenderTimer);
    }
    delayedRenderTimer = setTimeout(() => {
      func();
      clearTimeout(delayedRenderTimer);
      delayedRenderTimer = undefined;
    }, tempo);
  };

  const emitVisibleFeatures = () => {
    if (!map.getLayer(id)) { return; }

    const features = map.queryRenderedFeatures(currentLayer).slice(0, 50);
    dispatch('render', features);
  };

  onMount(() => {
    map.addLayer({
      id,
      type,
      source,
      paint,
      layout,
    });

    map.on('mousemove', (e) => {
      if (map.isStyleLoaded() && map.getLayer(id)) {
          const items = map.queryRenderedFeatures(e.point, {
              layers: [id],
          });
          if (items.length > 0) {
              map.getCanvas().style.cursor = 'pointer';
          } else {
              map.getCanvas().style.cursor = 'default';
          }
      }
    });

    return () => map.getLayer(id) && map.removeLayer(id);
  });

  map.on('render', debounce(emitVisibleFeatures, 150));

  map.on('click', id, dispatchLayerEvent);
</script>
