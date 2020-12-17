<script>
    import { getContext, onMount, createEventDispatcher } from 'svelte';
    import mapbox from 'mapbox-gl';
    import { stores } from '@sapper/app';

    const { page } = stores();

    const { getMap } = getContext('map');
    const map = getMap();

    const { getMapSourceId } = getContext('source');
    const source = getMapSourceId();

    export let type;
    export let paint = {};
    export let layout = {};
    export let id = 'layerId';

    let delayedRenderTimer;
    let popup; // desktop
    let multipointmobilectn; // mobile
    let multipointmobilecontent;

    const dispatch = createEventDispatcher();
    const dispatchLayerEvent = (event) => {
        dispatch('mapClick', {
            map,
            layerId: id,
            mapevent: event,
        });
    };

    const currentLayer = { layers: [id] };

    const debounce = (func, tempo) => () => {
        if (delayedRenderTimer) {
            clearTimeout(delayedRenderTimer);
        }
        delayedRenderTimer = setTimeout(() => {
            func();
            clearTimeout(delayedRenderTimer);
            delayedRenderTimer = undefined;
        }, tempo);
    };

    const emitVisibleFeatures = () => {
        if (!map.getLayer(id)) {
            return;
        }

        const features = map.queryRenderedFeatures(currentLayer);
        dispatch('render', features);
    };

    let searchparams;
    $: searchparams = new URLSearchParams($page.query);

    let urlid;
    $: {
        if (urlid && urlid != $page.params['id']) {
            map.setFeatureState({
                source: source,
                id: urlid
            }, { 'active': false });
            urlid = undefined;
        }
        urlid = $page.params['id'];
        map.setFeatureState({
            source: source,
            id: urlid
        }, {
            'active': true,
            'circle-sort-key': 1000
        });
    }

    const closeMobilePopup = () => {
        multipointmobilecontent.innerHTML = '';
        multipointmobilectn.classList.remove('open');
    };

    onMount(() => {
        map.addLayer({
            id,
            type,
            source,
            paint,
            layout,
        });

        map.on('mousemove', (e) => {
            if (map.isStyleLoaded() && map.getLayer(id)) {
                const items = map.queryRenderedFeatures(e.point, {
                    layers: [id],
                });
                if (items.length > 0) {
                    map.getCanvas().style.cursor = 'pointer';
                } else {
                    map.getCanvas().style.cursor = 'default';
                }
            }
        });

        return () => map.getLayer(id) && map.removeLayer(id);
    });

    map.on('render', debounce(emitVisibleFeatures, 150));

    map.on('click', id, (e) => {
        const items = map.queryRenderedFeatures(e.point, {
            layers: [id],
        });
        if (!items || items.length <= 0) return;
        if (items.length == 1) {
            dispatchLayerEvent(e);
        } else {
            var el = document.createElement('div');
            items.sort((a, b) => {
                if (a.properties.nom > b.properties.nom) return 1;
                if (a.properties.nom < b.properties.nom) return -1;
                return 0;
            });
            items.forEach((item) => {
                let searchparamswithlocation = searchparams;
                searchparamswithlocation.set('location', item.geometry.coordinates.toString());
                let contentTxt = `
            <a class="multipoint" href="/farms/${item.properties.recordid}?${searchparamswithlocation.toString()}">
                <div class="icon ${item.properties.categorie.replaceAll(' ', '-')
                        .toLowerCase()
                        .normalize()}"></div>
                <div class="multipoint-text">
                  <div class="title is-size-4">
                    ${item.properties.nom}
                  </div>
                  <div class="subtitle is-size-5">
                    via ${item.properties.nom_plateforme_partenaire}
                  </div>
                </div>

            </a>
          `;
                let content = document.createElement('div');
                content.innerHTML = contentTxt;
                let anchor = content.firstElementChild;
                anchor.addEventListener('click', () => {
                    popup.remove();
                });
                el.appendChild(anchor);
            });

            const mql = window.matchMedia('(max-width: 769px)');
            let mobileView = mql.matches;
            if (mobileView) {
                multipointmobilecontent.innerHTML = el.innerHTML;
                multipointmobilecontent.addEventListener('click', () => {
                    closeMobilePopup();
                });
                multipointmobilectn.classList.add('open');
            } else {
                popup = new mapbox.Popup()
                        .setLngLat(items[0].geometry.coordinates)
                        .setDOMContent(el)
                        .addTo(map);
            }
        }
    });
</script>

<style lang="scss" global>
    @import 'src/styles/_project-vars';

    .mapboxgl-popup-content {
        padding: 0 !important;
    }

    .multipoint {
        position: relative;
        display: block;
        border-bottom: 1px solid $border-split;

        &:first-child {
            margin-top: 20px;
        }

        &:last-child {
            border-bottom: none;
        }

        .icon {
            position: absolute;
            left: 10px;
            top: 4px;
            height: 12px;
            width: 12px;
            border: 1px solid black;
            border-radius: 100%;
            background-color: rgba(0, 0, 0, 0.5);

            &.producteur {
                border-color: $producteur;
                background-color: $producteur-light;
            }

            &.point-de-vente {
                border-color: $point-de-vente;
                background-color: $point-de-vente-light;
            }
        }

        .multipoint-text {
            margin: 10px 20px 10px 27px;
        }
    }

    .multipoint-mobile-container {
        display: none;
        position: fixed;
        z-index: 11;
        bottom: 50px;
        right: 0;
        width: 100%;
        max-height: 40%;
        flex-direction: column;
        background-color: #ffffff;
        /*border-top-left-radius: 10px;*/
        /*border-top-right-radius: 10px;*/
        border-radius: 10px;
        box-shadow: 0px -6px 13px rgba(0, 0, 0, 0.15);

        &.open {
            display: flex;
        }

        .close {
            color: black;
            font-size: 1.2em;
            display: flex;
            justify-content: flex-end;
        }

        .content {
            flex: 1;
            overflow: scroll;
        }

        .multipoint-text {
            margin: 20px 30px 20px 37px;
        }

        .icon {
            position: absolute;
            left: 20px;
        }
    }
</style>

<div class="multipoint-mobile-container" bind:this={multipointmobilectn}>
    <div class="close p-5">
        <i class="fas fa-times" aria-hidden="true" on:click={closeMobilePopup}></i>
    </div>
    <div class="content" bind:this={multipointmobilecontent}></div>
</div>
