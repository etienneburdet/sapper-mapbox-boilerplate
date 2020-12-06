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
        height: 100%;
        width: 100%;
    }
</style>
