<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';

    const { getMap, getSearchMarker, getGeolocateControls } = getContext('map');
    const map = getMap();
    const marker = getSearchMarker();
    const geolocate = getGeolocateControls();

    export let position = 'top-right';
    export let options = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: false,
        showUserLocation: false,
    };

    let status = false;

    geolocate.on('geolocate', (e) => {
        status = true;
        const coords = [e.coords.longitude, e.coords.latitude];
        map.flyTo({ center: coords });
        marker.setLngLat(coords).addTo(map);
    });

    geolocate.on('trackuserlocationstart', function () {
        status = true;
        dispatch('trackuserlocationstart');
    });

    geolocate.on('trackuserlocationend', function () {
        status = false;
        dispatch('trackuserlocationend');
    });

    geolocate.on('error', function() {
        console.error('GeolocateController : An error occurred.')
        status = false;
        dispatch('error');
    });

    if (position instanceof HTMLElement) {
        position.appendChild(geolocate.onAdd(map));
    } else if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
        map.addControl(geolocate, position);
    }
</script>
