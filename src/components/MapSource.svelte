<script>
  import { getContext, onMount, setContext } from 'svelte';
  import { fetchGeojson } from '@/routes/farms/_helpers';

  import { stores } from '@sapper/app';
  import Spinner from './Spinner.svelte';
  import { filterQueryParams } from '../routes/farms/_helpers';

  const { page, session } = stores();

  export let dataUrl;
  export let id;

  const { getMap } = getContext('map');
  const map = getMap();

  let isSourceLoaded = false;
  let loading = false;
  let farmsGeojson;
  let lastQueryParams = false;

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

  map.on('sourcedata', () => (loading = false));

  // When url change -> refetch the data
  $: {
    let filteredQueryParams = filterQueryParams($page.query);
    if (!lastQueryParams || filteredQueryParams !== lastQueryParams) {
      loading = true;
      fetchGeojson($page).then((res) => {
        farmsGeojson = res;
      });
      lastQueryParams = filteredQueryParams;
    }
  }

  // when data changed, refresh the source
  $: if (map.isStyleLoaded()) {
    setSource(farmsGeojson);
  } else {
    map.on('load', () => setSource(farmsGeojson));
  }

  onMount(() => {
    return destroySource;
  });
</script>

{#if isSourceLoaded}
  <slot />
{/if}

<div class="wrapper">
  <div class="control" class:is-loading={loading} />
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.control.is-loading::after {
    height: 10rem;
    width: 10rem;
  }
</style>
