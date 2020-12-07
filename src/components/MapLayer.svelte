<script>
    import { getContext, onMount, createEventDispatcher } from "svelte";

    const { getMap } = getContext('map');
    const map = getMap();

    const { getMapSourceId } = getContext('source');
    const source = getMapSourceId();

    export let type;
    export let paint = {};
    export let layout = {};
    export let id = 'layerId';

    const dispatch = createEventDispatcher();
    const dispatchLayerEvent = (event) => {
      dispatch('mapClick', {
        map: map,
        layerId: id,
        mapevent: event
      })
    }


    onMount(() => {
        console.log("MapLayer loading");
        map.addLayer({
            "id": id,
            "type": type,
            "source": source,
            "paint": paint,
            "layout": layout
        });
    });

    map.on('click', id, dispatchLayerEvent);

</script>
