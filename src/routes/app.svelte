<script context="module">
    import {isSSR} from "../stores/sideRendering";

    export async function preload(page, session) {
        if (typeof document == 'undefined') return;

        let isSSRPage;

        console.log("PRELOAD APP");
        if (!config.data.baseurl) return undefined;
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
    import Marker from "../components/Marker.svelte";

    export let geojson;
    export let getGeojson = undefined;
    export let asyncGeojson = undefined;

    let mapComponent;
    let geocoder;
    let geolocate;
    let markerPosition;

    const type = "circle";
    const paint = {
        'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            8, 1,
            15, 2,
            //19, 6,
            22, 15
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

    const recenterMapFromEvent = (CustomEvent) => {
        markerPosition = CustomEvent.detail.coords;
        if (CustomEvent.type == "geolocate") {
            geocoder.forceInputValue("Votre position");
        }
        geolocate.turnOff();
        console.log("FLY TO Event from controllers");
        mapComponent.flyTo({
            center: CustomEvent.detail.coords
        });
    }
</script>

<svelte:head>
    <title>App</title>
</svelte:head>

<Map navigationPosition="top-left" geolocatePosition="top-right">
    <div class="geocoder" slot="search">
      <Geocoder />
    </div>
    <!-- CSR -->
    {#if asyncGeojson}
        {#await asyncGeojson}
            <Spinner></Spinner>
        {:then geojson}
            <MapSource id="data" data={geojson}>
                <MapLayer type={type} paint={paint} />
            </MapSource>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}
        <!-- SSR -->
    {#if geojson.features}
        <MapSource id="data" data={geojson}>
            <MapLayer type={type} paint={paint} />
        </MapSource>
    {/if}
</Map>

.<style>
.geocoder {
  position: absolute;
  right: 50px;
  top: 10px;
}
</style>
