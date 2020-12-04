<svelte:head>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet"/>
</svelte:head>

<script>
  import {onMount, setContext} from 'svelte'
  import mapbox from 'mapbox-gl'

  mapbox.accessToken = 'pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ';
  let map
  let container

  setContext('mapbox', {
      mapbox,
      getMap: () => map,
      getAccessToken: () => mapbox.accessToken
  })

  onMount(() => {
      map = new mapbox.Map({
          container,
          style: 'mapbox://styles/mapbox/outdoors-v11',
          center: [45.406164, 5.765444]
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
