<svelte:head>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>


<script>
    import {getContext, onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import config from '@/app.config';

    /*export let marker = true;*/
    export let placeholder = "Search a place";
    let input;
    let query;
    let acCtn;

    const {getMap} = getContext('map');
    const map = getMap();

    const dispatch = createEventDispatcher();

    export const forceInputValue = (value) => {
        query = value;
    }

    onMount(async () => {
        const autoCompleteModule = await import("@tarekraafat/autocomplete.js");
        const autoComplete = autoCompleteModule.default;
        const ac = new autoComplete({
            data: {
                src: async () => {
                    var {lat, lng} = map.getCenter();
                    const token = config.jawg.acccess_token;
                    const searchquery = query;
                    const source = await fetch(
                        `https://api.jawg.io/places/v1/autocomplete?size=10&text=${searchquery}&focus.point.lat=${lat}&focus.point.lon=${lng}&boundary.country=FR&access-token=${token}`);
                    const data = await source.json();
                    const ret = data.features.reduce((acc, val) => {
                        val.properties['geometry'] = val.geometry;
                        return [...acc, val.properties];
                    }, []);
                    console.log(ret);
                    return ret;
                },
                key: ["label"],
                cache: false
            },
            placeHolder: placeholder,
            selector: "#searchbox",
            threshold: 2,
            debounce: 200,
            trigger: ['input','focus'],
            searchEngine: (query, record) => {
                return record;
            },
            sort: (firstResult, secondResult) => {
                if (firstResult.value.distance < secondResult.value.distance) return -1;
                if (firstResult.value.distance > secondResult.value.distance) return 1;
                return 0;
            },
            resultsList: {
                render: true,
                destination: acCtn,
                position: "afterend",
                element: "ul"
            },
            maxResults: 10,
            highlight: true,
            resultItem: {
                content: (data, source) => {
                    source.innerHTML = data.label;
                },
                element: "li"
            },
            noResults: (dataFeedback, generateList) => {
                generateList(ac, dataFeedback, dataFeedback.results);
                const result = document.createElement("li");
                result.setAttribute("class", "no_result");
                result.setAttribute("tabindex", "1");
                result.innerHTML = `<span>Found No Results for "${dataFeedback.query}"</span>`;
                document.querySelector(`#${ac.resultsList.idName}`).appendChild(result);
            },
            onSelection: feedback => {
                const coords = feedback.selection.value.geometry.coordinates;
                query = feedback.selection.value.label;
                /*console.log("MOVE MAP TO : " + coords);
                map.flyTo({
                    center: coords
                });*/
                dispatch('geocode', {
                    coords: coords
                });
            }
        });
    });

</script>


<div class="jawg-geocoder" bind:this={acCtn}>
    <input id="searchbox" class="input" type="text" autocomplete="off"
            bind:this={input} bind:value={query}/>
</div>


<style lang="scss" global>
    .jawg-geocoder {
        position: absolute;
        right: 50px;
        top: 10px;

        ul#autoComplete_list {
            background: white;
            margin-top: 5px;
            border: 1px solid #dbdbdb;
            border-radius: 6px;
            padding: 4px 0;

            li {
                padding: 4px 8px;
                &.autoComplete_selected {
                    background-color: #f4f4ff;
                }
            }
        }
    }

    /*.mapboxgl-ctrl-geocoder--icon-search {
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
    }*/
</style>