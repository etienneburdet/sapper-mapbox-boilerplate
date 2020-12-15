<script context="module">
  import { farmsShortlistUrl, getFarmWhere } from './_helpers';

  export async function preload(page, session) {
    const { id } = page.params;
    const { query } = page;

    let farmDetails;
    if (id !== 'all') {
      // With 'where'
      // const farmUrl = getFarmWhere(`add_nom_ferme like "${id}"`);
      // With 'record/:id'
      const farmUrl = getFarmRecord(id);
      const resFromAPI = await this.fetch(farmUrl);
      const jsonFromAPI = await resFromAPI.json();
      farmDetails = jsonFromAPI.record;
    }

    return {
      farmDetails,
      query,
    };
  }
</script>

<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

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

  import { paint } from './_mapstyle';
  import { q2center, setActivePoint, filterPage, getFarmRecord } from './_helpers';

  // export let farmsShortlist;
  let farmsShortlist = [];
  export let farmDetails;
  export let query;

  let toggleList = false;
  let showAdvFilters = false;
  let showMobileAdvFilters = false;

  const produits = ['Viande', 'Fromage', 'Fruits et légumes'];
  const partenaires = ['La ruche', 'La ferme', 'La la'];
  const services = ['Producteur', 'Point de vente'];
</script>

<section class="is-flex-desktop is-relative">
  <header class="is-hidden-desktop is-mobile level p-3">
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

  <aside id="list-ctn" class:mobile-open={toggleList}>
    <!-- DESKTOP LIST HEADER -->
    <header class="has-background-light is-hidden-mobile p-5">
      <Geocoder id="desktopsearchbox" geolocator="add-on" on:geocode={filterPage} />
      <div
        class="is-clickable mb-3"
        class:show-adv-filters={showAdvFilters}
        on:click={() => (showAdvFilters = !showAdvFilters)}
      >
        <span>Affiner la recherche</span>
        <span class="icon has-text-wihte"> <i class="fas fa-chevron-up" /></span>
      </div>

      <div class:is-hidden={showAdvFilters}>
        <Filter id="produits" options={produits} on:select={filterPage}>
          <p slot="title">Produits</p>
          <span slot="description">Choisissez votre cotégorie de porduits</span>
        </Filter>
        <Filter id="partenaires" options={partenaires} on:select={filterPage}>
          <p slot="title">Partenaires</p>
          <span slot="description">Choisissez les partenaires</span>
        </Filter>
        <Filter id="services" options={services} on:select={filterPage}>
          <p slot="title">Services</p>
          <span slot="description">Type de préstation</span>
        </Filter>
      </div>
    </header>
    <List activeItem={farmDetails} let:id={activeId}>
      {#each farmsShortlist as farm (farm)}
        <ListItem
          id={farm.properties.recordid}
          fields={farm.properties}
          active={farm.properties.recordid === activeId}
        />
      {/each}
    </List>
  </aside>
  <div class="is-flex-grow-1" id="map">
    <Map navigationPosition="bottom-right" center={q2center(query.coords)}>
      <!-- <MapSource id="farms">
      <MapLayer
        id="farms-circles"
        type="circle"
        {paint}
        on:mapClick={setActivePoint}
        on:render={(event) => (farmsShortlist = event.detail)}
      />
    </MapSource>
    {#if query.coords}
      <Marker center={q2center(query.coords)} />
    {/if} -->
    </Map>
  </div>
  <!-- MAP FOOTER / FILTERS -->
  <div class="is-fab has-text-centered is-hidden-desktop">
    <button
      class="button is-rounded is-dark mb-3"
      class:is-hidden={showMobileAdvFilters}
      on:click={() => (showMobileAdvFilters = true)}
    >
      Affiner les résultats
    </button>
  </div>
  <nav
    id="map-footer"
    class="is-hidden-desktop has-background-dark has-text-light"
    class:is-hidden={!showMobileAdvFilters}
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
    <Filter id="produits" options={produits} on:select={filterPage}>
      <p slot="title">Produits</p>
      <span slot="description">Choisissez votre cotégorie de porduits</span>
    </Filter>
    <Filter id="partenaires" options={partenaires} on:select={filterPage}>
      <p slot="title">Partenaires</p>
      <span slot="description">Choisissez les partenaires</span>
    </Filter>
    <Filter id="services" options={services} on:select={filterPage}>
      <p slot="title">Services</p>
      <span slot="description">Type de préstation</span>
    </Filter>
  </nav>
</section>

<!-- POP UP -->
<div id="popup-ctn" class:open={farmDetails}>
  {#if farmDetails}
    <Popup item={farmDetails} />
  {/if}
</div>

<style lang="scss">
  @import 'src/styles/_ods-design-system';

  $list-width: 374px;

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

    /* &:after {
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
      } */
  }

  #list-ctn-content {
    flex: 1;
    overflow: scroll;
    background: white;
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

  @media screen and (max-width: 768) {
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
