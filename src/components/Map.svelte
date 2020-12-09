<script>
  import { onMount, setContext } from 'svelte';
  import mapbox from 'mapbox-gl';
  import config from '@/app.config'

  mapbox.accessToken = config.mapbox.apikey;
  let map;
  let searchMarker;
  let geolocateControls;
  let container;

  setContext('map', {
      mapbox,
      getSearchMarker: () => searchMarker,
      getGeolocateControls: () => geolocateControls,
      getMap: () => map,
      getAccessToken: () => mapbox.accessToken,
  });

  export let geolocOptions = {
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserLocation: false,
  };

  onMount(() => {
      map = new mapbox.Map({
          container,
          style: config.mapbox.style,
          center: config.mapbox.init.center,
          zoom: config.mapbox.init.zoom
      })

      searchMarker = new mapbox.Marker();
      geolocateControls = new mapbox.GeolocateControl(geolocOptions);
  })
</script>

<svelte:head>
<link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"/>
</svelte:head>

<div bind:this={container}>
    {#if map}
        <slot></slot>
    {/if}
</div>

<style lang="scss">
  div  {
        z-index: 0;
        height: 100%;
        width: 100%;
    }
</style>
