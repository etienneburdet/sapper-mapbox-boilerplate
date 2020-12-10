<script>
  import { getContext, onMount } from 'svelte';

  const { mapbox, getMap } = getContext('map');
  const map = getMap();

  export let center;
  const marker = new mapbox.Marker()

  onMount(() => {
    marker.addTo(map);
    return () => marker.remove();
  });

  $: marker && marker.setLngLat(center)
</script>
