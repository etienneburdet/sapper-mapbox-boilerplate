<script>
    import {getContext, onMount} from "svelte";
    import mapbox from 'mapbox-gl'

    const { getMap } = getContext('map');
    const map = getMap();

    const { getMapSourceId } = getContext('source');
    const source = getMapSourceId();

    export let type;
    export let paint = {};
    export let layout = {};
    export let id = 'layerId';

    const dispatch = createEventDispatcher();
    const dispatchLayerEvent = (event) => {
      dispatch('mapClick', {
        map: map,
        layerId: id,
        mapevent: event,
      });
    }

    onMount(() => {
        map.addLayer({
            "id": source,
            "type": type,
            "source": source,
            "paint": paint,
            "layout": layout
        });

        map.on('mousemove', function (e) {
            var items = map.queryRenderedFeatures(e.point, {
                layers: [source]
            });
            if (items.length > 0) {
                map.getCanvas().style.cursor = 'pointer';
            } else {
                map.getCanvas().style.cursor = 'default';
            }
        });

        // map.on('click', (e) => {
        //     var items = map.queryRenderedFeatures(e.point, {layers: [source]});
        //     var el = document.createElement('div');
        //     el.classList.add('p-5');
        //     if (items.length > 0) {
        //         items.forEach((item) => {
        //             var label = document.createElement('p');
        //             label.innerText = item.properties.libellefrancais;
        //             el.appendChild(label);
        //         });
        //         new mapbox.Popup()
        //                 .setLngLat(items[0].geometry.coordinates)
        //                 .setDOMContent(el)
        //                 .addTo(map);
        //     }
        // });
    });
</script>

<style lang="scss" global>
    .mapboxgl-popup-content {
        padding: 15px !important;
    }
</style>
