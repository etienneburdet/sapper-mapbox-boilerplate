<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';

    export let position;

    const { getMap } = getContext('map');
    const map = getMap();

    const mapControl = new mapbox.NavigationControl();

    if (position instanceof HTMLElement) {
      position.appendChild(mapControl.onAdd(map));
    } else if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
      map.addControl(mapControl, position);
    }
</script>
