<svelte:head>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>


<script>
    import {getContext} from 'svelte';
    import mapbox from 'mapbox-gl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    export let position = "top-right";
    export let marker = true;
    export let bbox = [];
    export let placeholder = "Search a place";

    const { getMap, getAccessToken } = getContext('map');
    const map = getMap();
    const token = getAccessToken();

    var geocoder = new MapboxGeocoder({
        accessToken: token,
        mapboxgl: mapbox,
        marker: marker,
        bbox: bbox,
        placeholder: placeholder
    });

    if (position instanceof HTMLElement) {
        position.appendChild(geocoder.onAdd(map));
    } else if (['top-left','top-right','bottom-left','bottom-right'].includes(position)) {
        map.addControl(geocoder, position);
    }
</script>

<style lang="scss" global>
    .mapboxgl-ctrl-geocoder--icon-search {
        top: 5px !important;
    }
    .mapboxgl-ctrl-geocoder--input {
        height: 30px !important;
        font-size: 0.8em !important;
    }
    .mapboxgl-ctrl-geocoder--icon-close {
        margin-top: 0 !important;
        margin-right: 0 !important;
    }
    .mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--pin-right > * {
        top: 5.5px !important;
    }
</style>