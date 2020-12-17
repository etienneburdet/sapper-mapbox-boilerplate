<script>
  import { getContext, onMount, setContext } from 'svelte';
  import { fetchGeojson } from '@/routes/farms/_helpers';

  import { stores } from '@sapper/app';

  const { page, session } = stores();

  export let id;
  export let geojson;
  export let fetching;

  const { getMap } = getContext('map');
  const map = getMap();

  let loading;
  let isSourceLoaded = false;

  setContext('source', {
    getMapSourceId: () => id,
  });

  const setSource = (data) => {
    if (!data) return;
    if (map.getSource(id)) {
      map.getSource(id).setData(data);
    } else {
      map.addSource(id, {
        type: 'geojson',
        data,
        promoteId: 'recordid',
      });
    }
    isSourceLoaded = true;
  };

  const destroySource = () => {
    const { layers } = map.getStyle();
    layers.forEach((layer) => map.removeLayer(layer.id));

    if (map.getSource(id)) {
      map.removeSource(id);
    }
    isSourceLoaded = false;
  };

  // when data changed, refresh the source
  $: if (map.isStyleLoaded()) {
    setSource(geojson);
  } else {
    map.on('load', () => setSource(geojson));
  }
</script>

{#if isSourceLoaded}
  <slot />
{/if}

<div class="loader-wrapper">
  <div class="control" class:is-loading={fetching} />
</div>

<style lang="scss">
  .loader-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control {
    height: 10rem;
    width: 10rem;
  }

  div.control.is-loading::after {
    position: relative;
    height: 100%;
    width: 100%;
    border-color: #898d92;
    border-right-color: transparent;
    border-top-color: transparent;
  }
</style>
