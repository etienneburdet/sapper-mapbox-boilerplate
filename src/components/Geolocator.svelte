<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  let cleaner = /([+-]?\d+[.]?\d{0,6})\d*/;
  let geolocator;
  let searching = false;

  const dispatch = createEventDispatcher();

  const setGeo = (p) => {
    searching = false;

    const url = new URL(window.location);
    let lat = cleaner.exec(p.coords.latitude)[1];
    let long = cleaner.exec(p.coords.longitude)[1];
    /*url.searchParams.set('coords', long + ',' + lat);
    goto(url);*/
    dispatch('geolocate', { coords : [long, lat] });
  };

  const settings = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: Infinity,
  };

  export const getPosition = () => {
    if (!navigator || !navigator.geolocation) {
      return;
    }

    searching = true;
    navigator.geolocation.getCurrentPosition(setGeo, console.error, settings);
  };
</script>

<button
  class="button is-dark"
  class:spin={searching}
  bind:this={geolocator}
  on:click={getPosition}
>
  <img src="/location.svg" />
</button>

<style lang="scss">
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .spin {
    background-color: blue;
    color: white;

    img {
      fill: white;
      animation-name: spin;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
</style>
