<script>
  import { goto } from '@sapper/app';
  import Geocoder from '@/components/Geocoder.svelte';

  const navigateToCoords = (event) => {
    const url = new URL(window.location);
    url.searchParams.append('coords', event.detail.coords);
    url.pathname = 'trees/0';
    goto(url, { replaceState: true });
  };
</script>

<div class="container">
  <h1>La ferme d'à côté</h1>
  <Geocoder on:geocode={navigateToCoords} />
</div>
<h1>Welcome</h1>
<a href="trees/0">Search something</a>

<style lang="scss">
</style>
