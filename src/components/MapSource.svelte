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
        console.log("MapSource loading");
        map.isStyleLoaded()
                ? setSource()
                : map.on('load', setSource);

        return destroySource
    });

    const setSource = () => {
        if (map.getSource(id)) {
            console.log("Data set to MapSource");
            map.getSource(id).setData(data);
        } else {
            map.addSource(id, {
                'type': 'geojson',
                'data': data
            });
            go = true;
            console.log("source added to map", go, JSON.stringify(data).substring(0, 100));
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