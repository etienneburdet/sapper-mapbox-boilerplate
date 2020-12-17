<script>
  import { onMount, setContext, createEventDispatcher } from 'svelte';
  import mapbox from 'mapbox-gl';
  import config from '@/app.config';

  import NavigationControl from './NavigationControl.svelte';
  import GeolocateControl from './GeolocateControl.svelte';

  import { stores } from '@sapper/app';
  import { q2center, updateLocation } from '../routes/farms/_helpers';
  const { page } = stores();

  const dispatch = createEventDispatcher();

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

  let mobileView;
  let screenHeight;
  //let screenWidth;
  if (typeof window !== 'undefined') {
      const mql = window.matchMedia('(max-width: 769px)');
      mobileView = mql.matches;
      screenHeight = window.innerHeight;
      //screenWidth = window.innerWidth;
  }

  let onId;
  $: onId = ($page.params.id !== 'all');

  $: map && map.flyTo({
      center,
      zoom: (map.getZoom()<10?10:map.getZoom()),
      screenSpeed: 2.5,
      padding: {
        bottom: (onId?(mobileView?3*(innerHeight/5):0):0),
        left:   (onId?(mobileView?0:(374*2.05)/2):0)
      }
  });
</script>

<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div bind:this={container}>
  {#if map}
    {#if navigationPosition}
      <NavigationControl position={navigationPosition} />
    {/if}
    {#if geolocatePosition}
      <GeolocateControl position={geolocatePosition} />
    {/if}
    <slot />
  {/if}
</div>

<style lang="scss">
  div {
    z-index: 0;
    height: 100%;
    width: 100%;
  }
</style>
