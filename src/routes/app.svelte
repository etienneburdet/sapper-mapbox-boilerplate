<svelte:head>
    <title>App</title>
</svelte:head>

<script context="module">
    import {isSSR} from "../stores/sideRendering";

    export async function preload(page, session) {
        let isSSRPage;

        console.log("PRELOAD APP");
        const url = new URL(config.data.baseurl + config.data.query);
        const geojson = this.fetch(url);

        const unsubscribe = isSSR.subscribe(value => {
            isSSRPage = value;
        });
        unsubscribe();
        if (!isSSRPage) {
            return {geojson};
        }
        return geojson.then(r => r.json())
                .then(geojson => {
                            return {geojson};
                        }
                );
    }
</script>

<script>
    import Map from '@/components/Map.svelte'
    import GeolocateControl from "@/components/GeolocateControl.svelte";
    import Geocoder from "../components/Geocoder.svelte";
    import NavigationControl from "../components/NavigationControl.svelte";
    import MapSource from "../components/MapSource.svelte";
    import MapLayer from "../components/MapLayer.svelte";
    import Spinner from "../components/Spinner.svelte";

    import config from '@/app.config'
    /*import {isSSR} from "../stores/sideRendering";*/
    import {onMount} from "svelte";

    export let geojson;
    export let getGeojson = undefined;
    export let asyncGeojson = undefined;

    const paint = {
        'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            8, 1,
            15, 2,
            19, 6,
            22, 10
        ],
        'circle-opacity': 0.8,
        'circle-color': [
            'match',
            ['get', 'stadedeveloppement'],
            'A',
            '#317256',
            'J',
            '#398564',
            'JA',
            '#419873',
            'M',
            '#49ab81',
            /* other */ '#52bf90'
        ]
    }

    onMount(() => {
        console.log("mount app.svelte");
        console.log($isSSR);
        if ($isSSR) {
            isSSR.set(false);
        } else if (geojson instanceof Promise) {
            console.log("CSR !!! get Promise")
            getGeojson = async () => {
                const response = await geojson;
                if (response.ok) {
                    const responseJson = await response.json();
                    return responseJson;
                } else {
                    throw new Error("Something went wrong");
                }
            }
            asyncGeojson = getGeojson();
        }
    });
</script>

<Map>
    <Geocoder placeholder="Coucou" marker={false}></Geocoder>
    <NavigationControl position="top-left"></NavigationControl>
    <GeolocateControl position="top-right"></GeolocateControl>

    <!-- CSR -->
    {#if asyncGeojson}
        {#await asyncGeojson}
            <Spinner></Spinner>
        {:then geojson}
            <MapSource id="data" data={geojson}>
                <MapLayer type="circle" paint={paint}></MapLayer>
            </MapSource>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}
    <!-- SSR -->
    {#if geojson.features}
        <MapSource id="data" data={geojson}>
            <MapLayer type="circle" paint={paint}></MapLayer>
        </MapSource>
    {/if}

</Map>
