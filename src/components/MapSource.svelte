<script>
  import { getContext, onMount, setContext } from 'svelte';
  import { fetchGeojson } from '@/routes/farms/_helpers';

  import { stores } from '@sapper/app';
  import Spinner from './Spinner.svelte';
  import { filterQueryParams } from '../routes/farms/_helpers';

  const { page, session } = stores();

  export let id;

  const { getMap } = getContext('map');
  const map = getMap();

  let isSourceLoaded = false;
  let loading = true;
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

{#if loading}
  <div class="loader-wrapper">
    <div class="control is-loading" />
  </div>
{/if}

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
