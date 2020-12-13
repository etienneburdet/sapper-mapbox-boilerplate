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
        data,
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
    try {
      const resFromApi = await fetch(dataUrl);
      const geojsonFromApi = await resFromApi.json();
      map.addSource(id, {
        type: 'geojson',
        data: geojsonFromApi,
      });
      isSourceLoaded = true;
    } catch (err) {
      console.error('erreur', err);
    }

    // if (map.isStyleLoaded()) {
    //   setSource(geojsonFromApi);
    // } else {
    //   map.on('load', () => setSource(geojsonFromApi));
    // }

    return destroySource;
  });
</script>

{#if isSourceLoaded}
  <slot />
{/if}
