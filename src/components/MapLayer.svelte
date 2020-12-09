<script>
    import { getContext, onMount, createEventDispatcher } from 'svelte';

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
        map,
        layerId: id,
        mapevent: event,
      });
    };

    onMount(() => {
      map.addLayer({
        id,
        type,
        source,
        paint,
        layout,
      });

      return () => map.getLayer(id) && map.removeLayer(id);
    });

    map.on('click', id, dispatchLayerEvent);

    map.on('mousemove', (e) => {
      const items = map.queryRenderedFeatures(e.point, {
        layers: [id],
      });
      if (items.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
      } else {
        map.getCanvas().style.cursor = 'default';
      }
    });
</script>
