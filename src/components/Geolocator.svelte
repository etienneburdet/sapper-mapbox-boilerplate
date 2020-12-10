<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '@sapper/app';

    let cleaner = /([+-]?\d+[.]?\d{0,6})\d*/;
    let geolocator;
    let searching = false;

    const setGeo = p => {
        searching = false;

        const url = new URL(window.location);
        let lat = cleaner.exec(p.coords.latitude)[1];
        let long = cleaner.exec(p.coords.longitude)[1];
        url.searchParams.set('coords', long + ',' + lat);
        goto(url);
    };

    const settings = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: Infinity
    };

    export const getPosition = () => {
        searching = true;
        navigator.geolocation.getCurrentPosition(
                setGeo,
                console.error,
                settings
        );
    };

    onMount(async () => {
        if (navigator.geolocation) {
            geolocator.addEventListener('click', () => {
                getPosition();
            });
        }
    });

    onDestroy(() => {
    });
</script>

<div class="geolocator" class:spin={searching} bind:this={geolocator}>
    <img src="/location.svg"/>
</div>

<style lang="scss">
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }

    .geolocator {
        background-color: black;
        color: white;
        cursor: pointer;
        padding: 8px;
        border-radius: 123456789px;
        height: 36px;
        width: 36px;

        img {
            width: 20px;
            height: 20px;
        }

        &.spin {
            background-color: blue;
            color: white;

            img {
                fill: white;
                animation-name: spin;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        }
    }
</style>
