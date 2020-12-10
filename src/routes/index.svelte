<script context="module">
  export async function preload(page, session) {}
</script>

<script>
  import { goto } from '@sapper/app';
  import Geocoder from '@/components/Geocoder.svelte';

  const navigateToCoords = (event) => {
    const [lng, lat] = event.detail.coords;
    goto(`/trees/0?coords=${lng},${lat}`);
  };
</script>

<div class="container">
  <h1>La ferme d'à côté</h1>
  <Geocoder on:geocode={navigateToCoords} />
</div>
<h1>Welcome</h1>
<a rel="prefetch" href="trees/0">Search something</a>

<style lang="scss">
</style>
