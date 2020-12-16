<script context="module">
  import { farmFacetsUrl, getFarmWhere } from './_helpers';

  export async function preload(page, session) {
    const { id } = page.params;
    const { query } = page;

    let farmDetails;
    if (id !== 'all') {
      const farmUrl = getFarmRecord(id);
      const resFromAPI = await this.fetch(farmUrl);
      const jsonFromAPI = await resFromAPI.json();
      farmDetails = jsonFromAPI.record;
    }

    let { facets } = session;
    if (!facets) {
      const resFromAPI = await this.fetch(farmFacetsUrl);
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
      farmDetails,
      facets,
      query,
    };
  }
</script>

<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  import Filter from '@/components/Filter.svelte';
  import Geocoder from '@/components/Geocoder.svelte';
  import Map from '@/components/Map.svelte';
  import MapSource from '@/components/MapSource.svelte';
  import MapLayer from '@/components/MapLayer.svelte';
  import Marker from '@/components/Marker.svelte';
  import Popup from '@/components/Popup.svelte';
  import List from '@/components/List.svelte';
  import ListItem from '@/components/ListItem.svelte';
  import Geolocator from '@/components/Geolocator.svelte';

  import Filters from './_partials/Filters.svelte';
  import PopupContent from './_partials/PopupContent.svelte';
  import ItemContent from './_partials/ItemContent.svelte';

  import { paint } from './_constants';
  import { q2center, setActivePoint, filterPage, getFarmRecord } from './_helpers';
  import { stores } from '@sapper/app';

  const { page } = stores();

  export let farmDetails;
  export let facets;
  export let query;

  let queryparams;
  let farmsShortlist = [];

  let toggleList = false;
  let showAdvFilters = false;
  let showMobileAdvFilters = false;

  $: queryparams = new URLSearchParams($page.query);
</script>

<section class="is-flex is-relative">
  <div
    class="is-fab is-top has-text-left p-3 is-hidden-desktop"
    class:is-hidden={$page.params.id === 'all'}
  >
    <a href="/farms/all" class="button is-rounded is-dark">
      <span class="icon"><i class="fas fa-arrow-left" /></span>
    </a>
  </div>
  <header
    class="is-hidden-desktop is-mobile level p-3"
    class:is-invisible={$page.params.id !== 'all'}
  >
    <div class="level-left">
      <div class="level-item mr-3">
        <button class="button is-dark" on:click={() => (toggleList = !toggleList)}>
          {#if !toggleList}<span>Liste</span>{/if}
          {#if toggleList}<span>Carte</span>{/if}
        </button>
      </div>
    </div>
    <div class="level-item">
      <Geocoder id="mobilesearchbox" on:geocode={filterPage} geolocator="separate" />
    </div>
  </header>

  <aside
    id="list-ctn"
    class:mobile-open={toggleList || $page.params.id !== 'all'}
    class:popup-open={$page.params.id !== 'all'}
  >
    <!-- DESKTOP LIST HEADER -->
    <header class="has-background-primary is-hidden-mobile p-5">
      <Geocoder id="desktopsearchbox" geolocator="add-on" on:geocode={filterPage} />
      <div
        class="is-clickable mb-3"
        class:show-adv-filters={showAdvFilters}
        on:click={() => (showAdvFilters = !showAdvFilters)}
      >
        <span>Affiner la recherche</span>
        <span class="icon"> <i class="fas fa-chevron-up" /></span>
      </div>
      {#if showAdvFilters}
        <div transition:slide={{ duration: 200 }}>
          <Filters />
        </div>
      {/if}
    </header>
    <List activeItem={farmDetails} let:id={activeId}>
      {#each farmsShortlist as farm (farm)}
        <ListItem
          id={farm.properties.recordid}
          fields={farm.properties}
          geometry={farm.geometry}
          active={farmDetails && farm.properties.recordid === farmDetails.id}
        >
          <ItemContent fields={farm.properties} />
        </ListItem>
      {/each}
    </List>
    <div id="popup-ctn" class="has-background-white p-5" class:open={farmDetails}>
      {#if farmDetails}
        <Popup item={farmDetails}>
          <PopupContent item={farmDetails} />
        </Popup>
      {/if}
    </div>
  </aside>
  <div class="is-flex-grow-1" id="map">
    <Map navigationPosition="bottom-right" center={q2center(query.location)}>
      <MapSource id="farms">
        <MapLayer
          id="farms-circles"
          type="circle"
          {paint}
          on:mapClick={setActivePoint(queryparams)}
          on:render={(event) => (farmsShortlist = event.detail)}
        />
      </MapSource>
      {#if query.marker}
        <Marker center={q2center(query.marker)} options={{ color: 'blue' }} />
      {/if}

      {#if query.location && query.location != query.marker}
        <Marker center={q2center(query.location)} options={{ color: '#74CABF' }} />
      {/if}
    </Map>
  </div>
  <!-- MAP FOOTER / FILTERS -->
  <div class="is-fab is-bottom has-text-centered is-hidden-desktop">
    <button
      class="button is-rounded is-dark mb-3"
      class:is-hidden={showMobileAdvFilters || $page.params.id !== 'all'}
      on:click={() => (showMobileAdvFilters = true)}
    >
      Affiner les résultats
    </button>
  </div>
  {#if showMobileAdvFilters}
    <nav
      id="map-footer"
      class="is-hidden-desktop has-background-dark has-text-light"
      class:is-hidden={!showMobileAdvFilters}
      transition:slide={{ duration: 200 }}
    >
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p class="is-size-4 has-text-weight-bold">Affiner les résultats</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level item">
            <span class="icon is-clickable" role="button">
              <i class="fas fa-times fa-lg" on:click={() => (showMobileAdvFilters = false)} />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Filters />
      </div>
    </nav>
  {/if}
</section>

<!-- POP UP -->
<style lang="scss">
  @import 'src/styles/_ods-design-system';
  @import 'src/styles/_project-vars';

  section {
    height: 100%;
  }

  #map {
    position: relative;
    top: 0;
    right: 0;
    z-index: 0;
    height: 100%;
  }

  .icon {
    transition: all 0.2s ease;
  }

  .show-adv-filters .icon {
    transition: all 0.2s ease;
    transform: rotate(-180deg);
  }

  header {
    position: relative;
    z-index: 1;
  }

  #map-footer {
    position: absolute;
    bottom: 0px;
    z-index: 1;
    width: 100%;
    padding: 22px 20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  #list-ctn {
    position: relative;
    display: flex;
    flex-direction: column;
    width: $list-width;
    height: 100%;
    z-index: 2;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  }

  #popup-ctn {
    position: absolute;
    left: calc(-1 * #{$popup-width});
    width: $popup-width;
    height: 100%;
    overflow-y: hidden;
    border-left: 1px solid #dddddd;
    transition: 0.2s ease left;
    z-index: -1;

    &.open {
      left: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    section {
      flex-direction: column;
      justify-content: space-between;
    }

    #map {
      position: absolute;
      width: 100%;
    }

    #list-ctn {
      left: -100%;
      bottom: 0;
      width: 100%;
      z-index: 1;
      height: calc(100% - #{$spacing-400});
      transition: 0.2s ease left;

      &.mobile-open {
        left: 0;
      }

      &.popup-open {
        height: 60%;
      }
    }

    #popup-ctn {
      left: 0;
      bottom: -100%;
      width: 100%;
      transition: 0.2s ease bottom;
      z-index: 1;

      &.open {
        left: 0;
        bottom: 0;
      }
    }
  }
</style>
