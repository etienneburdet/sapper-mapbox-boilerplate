<script>
    import { getContext, onMount, setContext } from 'svelte';
    import { fetchGeojson } from '@/routes/farms/_helpers';

    import { stores } from '@sapper/app';
    const { page, session } = stores();

    export let dataUrl;
    export let id;

    const { getMap } = getContext('map');
    const map = getMap();

    let isSourceLoaded;
    let farmsGeojson;

    setContext('source', {
        getMapSourceId: () => id,
    });

    const setSource = (data) => {
        if (map.getSource(id)) {
            map.getSource(id)
                    .setData(data);
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

    // When url change -> refetch the data
    $: if ($page.params['id'] == 'all') fetchGeojson($page).then((res) => { farmsGeojson = res; });

    // when data changed, refresh the source
    $: if (map.isStyleLoaded()) {
      setSource(farmsGeojson)
    } else {
      map.on('load', () => setSource(farmsGeojson));
    }

    onMount(() => {
        return destroySource;
    });
</script>

{#if isSourceLoaded}
    <slot/>
{/if}
