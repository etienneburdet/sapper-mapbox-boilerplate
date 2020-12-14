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

<div id="page-ctn">
  <div id="list-ctn" class:mobile-open={toggleList}>
    <!-- DESKTOP LIST HEADER -->
    <div id="list-ctn-header" class="custom-styled-select">
      <Geocoder id="desktopsearchbox" geolocator={true}
                on:geocode={filterPage} on:geolocate={filterPage} />

      <div
        id="list-ctn-header-btn"
        class:show-adv-filters={showAdvFilters}
        on:click={() => (showAdvFilters = !showAdvFilters)}
      >
        Affiner la recherche
        <i class="fas fas-arrow-up" />
      </div>

      <div class="adv-filters-ctn" class:show-adv-filters={showAdvFilters}>
        <Filter id="produits" options={produits} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Produits</h4>
          <span slot="description">Choisissez votre cotégorie de porduits</span>
        </Filter>
        <Filter id="partenaires" options={partenaires} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Partenaires</h4>
          <span slot="description">Choisissez les partenaires</span>
        </Filter>
        <Filter id="services" options={services} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Services</h4>
          <span slot="description">Type de préstation</span>
        </Filter>
      </div>
    </div>
    <!-- DESKTOP LIST -->
    <div id="list-ctn-content">
      <List activeItem={farmDetails} let:id={activeId}>
        {#each farmsShortlist as farm (farm)}
          <ListItem
            id={farm.properties.recordid}
            fields={farm.properties}
            active={farm.properties.recordid === activeId}
          />
        {/each}
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
        <Geocoder id="mobilesearchbox" on:geocode={filterPage} />
      </div>
      <div class="geolocator">
        <Geolocator on:geolocate={filterPage} />
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
        <Filter id="produits" options={produits} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Produits</h4>
          <span slot="description">Choisissez votre cotégorie de porduits</span>
        </Filter>
        <Filter id="partenaires" options={partenaires} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Partenaires</h4>
          <span slot="description">Choisissez les partenaires</span>
        </Filter>
        <Filter id="services" options={services} on:select={filterPage}>
          <h4 class="title is-4" slot="title">Services</h4>
          <span slot="description">Type de préstation</span>
        </Filter>
      </div>
    </div>

    <!-- MAP -->
    <Map navigationPosition="bottom-right" center={q2center(query.coords)}>
      <MapSource id="farms">
        <MapLayer
          id="farms-circles"
          type="circle"
          {paint}
          on:mapClick={setActivePoint}
          on:render={(event) => farmsShortlist = event.detail}
        />
      </MapSource>
      {#if query.coords}
        <Marker center={q2center(query.coords)} />
      {/if}
    </Map>
  </div>

  <!-- POP UP -->
  <div id="popup-ctn" class:open={farmDetails}>
    {#if farmDetails}
      <Popup item={farmDetails} />
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
        align-items: center;
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
