<script>
    import { getContext } from 'svelte';

    export let position;

    const { getMap, mapbox } = getContext('map');
    const map = getMap();

    const mapControl = new mapbox.NavigationControl();

    if (position instanceof HTMLElement) {
      position.appendChild(mapControl.onAdd(map));
    } else if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
      map.addControl(mapControl, position);
    }
</script>
