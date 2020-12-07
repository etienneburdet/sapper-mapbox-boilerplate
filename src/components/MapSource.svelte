<script>
    import {getContext, onMount, setContext} from "svelte";

    export let data;
    export let id;

    let go;

    const {getMap} = getContext('map');
    const map = getMap();

    setContext('source', {
        getMapSourceId: () => id
    });

    onMount(() => {
        map.isStyleLoaded()
                ? setSource()
                : map.on('load', setSource);

        return destroySource
    });

    const setSource = () => {
        if (map.getSource(id)) {
            map.getSource(id).setData(data);
        } else {
            map.addSource(id, {
                'type': 'geojson',
                'data': data
            });
            go = true;
        }
    };

    const destroySource = () => {
        go = false;
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
        if (map.getSource(id)) {
            map.removeSource(id);
        }
    }

</script>

{#if go}
    <slot></slot>
{/if}
