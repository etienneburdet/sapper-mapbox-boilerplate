
<script>
    import { getContext } from 'svelte';

    export let position;

    const { getMap, getSearchMarker, getGeolocateControl } = getContext('map');
    const map = getMap();
    const marker = getSearchMarker();
    const geolocate = getGeolocateControl();

    let status = false;

    geolocate.on('geolocate', (e) => {
      status = true;
      const coords = [e.coords.longitude, e.coords.latitude];
      map.flyTo({ center: coords });
      marker.setLngLat(coords).addTo(map);
    });

    // geolocate.on('trackuserlocationstart', () => {
    //   status = true;
    //   dispatch('trackuserlocationstart');
    // });
    //
    // geolocate.on('trackuserlocationend', function () {
    //     status = false;
    //     dispatch('trackuserlocationend');
    // });

    geolocate.on('error', () => {
      status = false;
    });

    if (position instanceof HTMLElement) {
      position.appendChild(geolocate.onAdd(map));
    } else if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
      map.addControl(geolocate, position);
    }
</script>

<svelte:head>
<script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>
