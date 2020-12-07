<script>
    import Map from '@/components/Map.svelte'
    import GeolocateControl from "@/components/GeolocateControl.svelte";
    import Geocoder from "../components/Geocoder.svelte";
    import NavigationControl from "../components/NavigationControl.svelte";
</script>

<svelte:head>
<title>App</title>
</svelte:head>

<Map>
    <Geocoder placeholder="Coucou" marker={false}></Geocoder>
    <NavigationControl position="top-left"></NavigationControl>
    <GeolocateControl position="top-right"></GeolocateControl>
</Map>
