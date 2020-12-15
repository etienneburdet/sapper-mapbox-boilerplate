<script>
  import { getContext, onMount } from 'svelte';

  const { mapbox, getMap } = getContext('map');
  const map = getMap();

  export let center;
  export let options = {};

  const marker = new mapbox.Marker(options);

  onMount(() => {
    marker.addTo(map);
    return () => marker.remove();
  });

  $: marker && marker.setLngLat(center)
</script>
