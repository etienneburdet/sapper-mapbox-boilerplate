<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import {getContext} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import mapbox from 'mapbox-gl';

    const {getMap} = getContext('map');
    const map = getMap();

    const dispatch = createEventDispatcher();

    export const turnOff = () => {
        if (status == true) geolocate.trigger();
    };

    export let position = 'top-right';
    export let options = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
    };

    let status = false;

    const geolocate = new mapbox.GeolocateControl(options);

    geolocate.on('geolocate', async (e) => {
        status = true;
        dispatch('geolocate', {
            coords: [e.coords.longitude, e.coords.latitude],
            geolocateEvent: e
        });
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
