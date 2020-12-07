<script>
    import {getContext, onMount, createEventDispatcher} from "svelte";

    const {getMap} = getContext('map');
    const map = getMap();

    const {getMapSourceId} = getContext('source');
    const source = getMapSourceId();

    const dispatch = createEventDispatcher();
    const dispatchLayerEvent = (event) => {
      dispatch('mapClick', {
        map: map,
        layerId: layerId,
        mapevent: event
      })
    }

    export let type;
    export let paint = {};
    export let layout = {};
    export let layerId = 'layerId';

    onMount(() => {
        map.addLayer({
            "id": layerId,
            "type": type,
            "source": source,
            "paint": paint,
            "layout": layout
        });
    });

    map.on('click', layerId, dispatchLayerEvent)
</script>
