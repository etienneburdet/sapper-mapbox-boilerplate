<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { getContext } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import mapbox from 'mapbox-gl';

    const { getMap } = getContext('map');
    const map = getMap();

    const dispatch = createEventDispatcher();

    export let position = 'top-right';
    export let options = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    };

    const geolocate = new mapbox.GeolocateControl(options);

    geolocate.on('geolocate', async (e) => {
        dispatch('geolocate', {
            event: e
        });
    });
    geolocate.on('trackuserlocationend', function() {
        dispatch('trackuserlocationend');
    });

    if (position instanceof HTMLElement) {
        position.appendChild(geolocate.onAdd(map));
    } else if (['top-left','top-right','bottom-left','bottom-right'].includes(position)) {
        map.addControl(geolocate, position);
    }
</script>
