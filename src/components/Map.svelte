<script>
  import { onMount, setContext } from 'svelte';
  import mapbox from 'mapbox-gl';
  import config from '@/app.config';

  import NavigationControl from './NavigationControl.svelte';
  import GeolocateControl from './GeolocateControl.svelte';

  export let center;
  export let navigationPosition;
  export let geolocatePosition;
  export let geolocateOptions = {
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: false,
    showUserLocation: false,
  };

  let map;
  let searchMarker;
  let container;
  let geolocateControl;

  mapbox.accessToken = config.mapbox.apikey;
  setContext('map', {
    mapbox,
    getSearchMarker: () => searchMarker,
    getGeolocateControl: () => geolocateControl,
    getMap: () => map,
    getAccessToken: () => mapbox.accessToken,
  });

  onMount(() => {
    map = new mapbox.Map({
      container,
      style: config.mapbox.style,
      center: config.mapbox.init.center,
      zoom: config.mapbox.init.zoom,
    });

    searchMarker = new mapbox.Marker();

    if (geolocatePosition) {
      geolocateControl = new mapbox.GeolocateControl(geolocateOptions);
    }
  });

  $: map && map.flyTo({ center });
</script>

<svelte:head>
<link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"/>
</svelte:head>

<div bind:this={container}>
    {#if map}
        {#if navigationPosition}
          <NavigationControl position={navigationPosition} />
        {/if}
        {#if geolocatePosition}
          <GeolocateControl position={geolocatePosition} />
        {/if}
        <slot name="search"></slot>
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
