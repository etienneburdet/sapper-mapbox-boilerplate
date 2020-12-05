<script>
    import {getContext, onMount} from "svelte";

    const {getMap} = getContext('map');
    const map = getMap();

    const {getMapSourceId} = getContext('source');
    const source = getMapSourceId();

    export let type;
    export let paint = {};
    export let layout = {};

    onMount(() => {
        console.log("MapLayer loading");
        map.addLayer({
            "id": source,
            "type": type,
            "source": source,
            "paint": paint,
            "layout": layout
        });
    });
</script>