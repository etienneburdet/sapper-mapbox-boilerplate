<script context="module">
    import {
        jsonEndpoint,
        getRecord,
        getFacets,
        jsonToGeojson
    } from './_helpers';
    import { addQueryParamsObject } from '../../plugins/ods-data';

    export async function preload(page, session) {
        const { id } = page.params;
        const { query } = page;

        let details;
        if (id !== '0') {
            const resFromAPI = await this.fetch(getRecord(id));
            /*const resFromAPI = await this.fetch(addQueryParamsObject(getRecord(id))({
                apikey: 'a7e4ed36006940138ec06146831b780b8c41b2d14719ba6da17c6148'
            }));*/
            const jsonFromAPI = await resFromAPI.json();
            details = jsonFromAPI.record;
        }

        let { data } = session;
        if (!data) {
            const resFromAPI = await this.fetch(jsonEndpoint);
            let jsonData = await resFromAPI.json();
            data = jsonToGeojson(jsonData);
            session.data = data;
        }

        let { facets } = session;
        if (!facets) {
            const resFromAPI = await this.fetch(getFacets);
            const jsonFacets = await resFromAPI.json();
            if (jsonFacets) {
                let facetsObj = {};
                jsonFacets.facets.forEach((facet) => {
                    facetsObj[facet.name] = facet.facets;
                });
                facets = facetsObj;
                session.facets = facets;
            }
        }

        return {
            data,
            facets,
            details,
            query,
        };
    }
</script>

<script>
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';

    import AdvancedFilters from '../../components/AdvancedFilters.svelte';
    import Geocoder from '@/components/Geocoder.svelte';
    import Map from '@/components/Map.svelte';
    import MapSource from '@/components/MapSource.svelte';
    import MapLayer from '@/components/MapLayer.svelte';
    import Marker from '@/components/Marker.svelte';
    import Popup from '@/components/Popup.svelte';
    import List from '@/components/List.svelte';
    import ListItem from '@/components/ListItem.svelte';
    import Geolocator from '@/components/Geolocator.svelte';

    import { paint } from './_mapstyle';
    import { q2center, setActivePoint } from './_helpers';

    export let data;
    export let facets;
    export let details;
    export let query;

    let toggleList = false;
    let showAdvFilters = false;
    let showMobileAdvFilters = false;
</script>

<div id="page-ctn">
    <div id="list-ctn" class:mobile-open={toggleList}>
        <!-- DESKTOP LIST HEADER -->
        <div id="list-ctn-header" class="custom-styled-select">
            <Geocoder id="desktopsearchbox" geolocator={true}/>

            <div
                    id="list-ctn-header-btn"
                    class:show-adv-filters={showAdvFilters}
                    on:click={() => (showAdvFilters = !showAdvFilters)}
            >
                Affiner la recherche
                <i class="fas fas-arrow-up"/>
            </div>

            <div class="adv-filters-ctn" class:show-adv-filters={showAdvFilters}>
                <AdvancedFilters {facets}/>
            </div>
        </div>
        <!-- DESKTOP LIST -->
        <div id="list-ctn-content">
            <List activeItem={details} let:id={activeId}>
                {#if data && data.features}
                    {#each data.features as datum, index (datum.properties.id)}
                        <ListItem
                                id={datum.properties.id}
                                fields={datum.properties}
                                active={datum.properties.id === activeId}
                        />
                    {/each}
                {/if}
            </List>
        </div>
    </div>

    <div id="map-ctn">
        <!-- MOBILE HEADER -->
        <div id="map-header">
            <button class="button is-dark" on:click={() => (toggleList = !toggleList)}>
                {#if !toggleList}<span>Liste</span>{/if}
                {#if toggleList}<span>Carte</span>{/if}
            </button>
            <div id="map-header-content">
                <Geocoder id="mobilesearchbox"/>
            </div>
            <div class="geolocator">
                <Geolocator/>
            </div>
        </div>

        <!-- MAP FOOTER / FILTERS -->
        <div id="map-footer">
            <button
                    class="button is-rounded is-dark mb-3"
                    id="map-footer-filters-btn"
                    class:show-adv-filters={showMobileAdvFilters}
                    on:click={() => (showMobileAdvFilters = true)}
            >
                Affiner les résultats
            </button>
            <div class="adv-filters-ctn" class:show-adv-filters={showMobileAdvFilters}>
                <div class="adv-filters-ctn-top">
                    <p>Affiner les résultats</p>
                    <i
                            class="header-menu-close fas fa-times"
                            on:click={() => (showMobileAdvFilters = false)}
                    />
                </div>
                <AdvancedFilters {facets}/>
            </div>
        </div>

        <!-- MAP -->
        <Map navigationPosition="bottom-right" center={query && q2center(query.coords)}>
            <MapSource id="data" data={data}>
                <MapLayer id="data-circles" type="circle" {paint} on:mapClick={setActivePoint}/>
            </MapSource>
            {#if query && query.coords}
                <Marker center={q2center(query.coords)}/>
            {/if}
        </Map>
    </div>

    <!-- POP UP -->
    <div id="popup-ctn" class:open={details}>
        {#if details}
            <Popup item={details}/>
        {/if}
    </div>
</div>

<style lang="scss">
    #page-ctn {
        display: flex;
        height: 100%;
    }

    #list-ctn {
        display: flex;
        flex-direction: column;
        width: 374px;
        z-index: 2;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);

        #list-ctn-header {
            background-color: black;
            color: white;
            position: relative;
            padding: 20px;

            #list-ctn-header-btn {
                display: flex;
                align-items: center;
                cursor: pointer;

                &:after {
                    border: 2px solid white;
                    border-radius: 1.5px;
                    border-right: 0;
                    border-top: 0;
                    content: ' ';
                    display: block;
                    height: 0.625em;
                    margin-left: 5px;
                    transform: rotate(135deg);
                    transform-origin: center;
                    width: 0.625em;
                }

                &.show-adv-filters:after {
                    transform: rotate(-45deg);
                }
            }

            .adv-filters-ctn {
                display: none;
                margin-top: 10px;

                &.show-adv-filters {
                    display: block;
                }
            }
        }

        #list-ctn-content {
            flex: 1;
            overflow: scroll;
            background: white;
        }

        :global(&.open) {
            left: 0;
        }
    }

    #map-ctn {
        width: calc(100% - 374px);
        height: 100%;
        display: flex;
        flex-direction: column;

        #map-header {
            display: none;

            position: absolute;
            z-index: 1;
            padding: 10px;
            height: 57px;
            width: 100%;

            #map-header-content {
                flex: 1;
                margin: 0 5px;
            }
        }

        #map-footer {
            display: none;

            position: absolute;
            bottom: 0px;
            z-index: 1;
            width: 100%;
            justify-content: center;
            align-content: center;

            #map-footer-filters-btn {
                &.show-adv-filters {
                    display: none;
                }
            }

            .adv-filters-ctn {
                display: none;
                width: 100%;
                padding: 22px 20px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                background-color: black;
                color: white;
                box-shadow: 0px -6px 13px rgba(0, 0, 0, 0.15);

                .adv-filters-ctn-top {
                    display: flex;
                    justify-content: space-between;

                    p {
                        font-size: 1.2em;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }

                    .header-menu-close {
                        font-size: 1.2em;
                        cursor: pointer;
                    }
                }

                &.show-adv-filters {
                    display: block;
                }
            }
        }
    }

    #popup-ctn {
        position: absolute;
        left: -395px;
        width: 395px;
        height: 100%;
        overflow-y: auto;
        background: white;
        border-left: 1px solid #dddddd;
        transition: 0.2s ease left;
        z-index: 1;
        padding: 20px;

        &.open {
            left: 374px;
        }
    }

    @media screen and (max-width: 769px) {
        #list-ctn {
            position: absolute;
            left: -100%;
            bottom: 0;
            width: 100%;
            z-index: 1;
            background: white;
            height: calc(100% - 55px);
            transition: 0.2s ease left;

            &.mobile-open {
                left: 0;

                #list-ctn-header {
                    display: none;
                }
            }
        }

        #map-ctn {
            width: 100%;

            #map-header {
                display: flex;
                align-items: center
            }

            #map-footer {
                display: flex;
            }
        }

        #popup-ctn {
            left: 0;
            bottom: -70%;
            height: 70%;
            width: 100%;
            transition: 0.2s ease bottom;

            &.open {
                left: 0;
                bottom: 0;
            }
        }
    }
</style>
