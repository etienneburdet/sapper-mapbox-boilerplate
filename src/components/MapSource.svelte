<script>
  import { getContext, onMount, setContext } from 'svelte';

  export let dataUrl;
  export let id;

  let isSourceLoaded;

  const { getMap } = getContext('map');
  const map = getMap();

  setContext('source', {
    getMapSourceId: () => id,
  });

  const setSource = (data) => {
    if (map.getSource(id)) {
      map.getSource(id).setData(data);
    } else {
      map.addSource(id, {
        type: 'geojson',
        data: dataUrl,
      });
      isSourceLoaded = true;
    }
  };

  const destroySource = () => {
    const { layers } = map.getStyle();
    layers.forEach((layer) => map.removeLayer(layer.id));

    if (map.getSource(id)) {
      map.removeSource(id);
    }
    isSourceLoaded = false;
  };

  onMount(async () => {
    if (map.isStyleLoaded()) {
      setSource();
    } else {
      map.on('load', () => setSource());
    }

    return destroySource;
  });
</script>

{#if isSourceLoaded}
  <slot />
{/if}
