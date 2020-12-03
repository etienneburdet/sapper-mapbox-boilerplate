<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<script>
  import { onMount, setContext } from 'svelte';
  import mapbox from 'mapbox-gl';

  mapbox.accessToken = 'pk.eyJ1IjoiZXRpZW5uZWJ1cmRldCIsImEiOiJja2F4bHN2MXUwMGliMnJsN2RzNXowYzQ1In0.ju6w4WN1F_CRVNXtp5L-7w';
  let map;
  let container;

  setContext('mapbox', {
    mapbox,
    getMap: () => map,
  });

  onMount(() => {
    map = new mapbox.Map({
      container,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [45.406164, 5.765444],
    });
  });
</script>

<div bind:this={container}>
  {#if map}
    <slot></slot>
  {/if}
</div>

<style lang="scss">
  div {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: 100vh;
    width: 100vw;
  }
</style>
