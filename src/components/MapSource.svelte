<script>
  import { getContext, onMount, setContext } from 'svelte';

  export let data;
  export let id;

  let isSourceLoaded;

  const { getMap } = getContext('map');
  const map = getMap();

  setContext('source', {
    getMapSourceId: () => id,
  });

  const setSource = () => {
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
    if (map.getSource(id)) {
      map.removeSource(id);
    }
    isSourceLoaded = false;
  };

  onMount(() => {
    map.isStyleLoaded() ? setSource() : map.on('load', setSource);

    return destroySource;
  });
</script>

{#if isSourceLoaded}
    <slot></slot>
{/if}
