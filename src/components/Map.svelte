<svelte:head>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"/>
</svelte:head>

<script>
  import {onMount, setContext} from 'svelte'
  import mapbox from 'mapbox-gl'
  import config from '@/app.config'

  mapbox.accessToken = config.mapbox.apikey;
  let map
  let container

  setContext('map', {
      mapbox,
      getMap: () => map,
      getAccessToken: () => mapbox.accessToken
  })

  onMount(() => {
      map = new mapbox.Map({
          container,
          style: config.mapbox.style,
          center: config.mapbox.init.center,
          zoom: config.mapbox.init.zoom
      })
  })
</script>

<div id="map-container" bind:this={container}>
    {#if map}
        <slot></slot>
    {/if}
</div>

<style lang="scss" global>
    #map-container {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(100% - 50px);
        width: 100%;
    }

    .mapboxgl-canvas {
        &:focus {
            outline: none;
        }
    }
</style>
