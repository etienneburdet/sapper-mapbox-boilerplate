<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';

    const { getMap } = getContext('map');
    const map = getMap();

    export let lngLat;
    let marker;

    $: {
      if (marker) { // if marker already exists, delete before adding a new one
        marker.remove();
      }
      if (lngLat) {
        marker = new mapbox.Marker().setLngLat(lngLat).addTo(map);
      }
    }
</script>
