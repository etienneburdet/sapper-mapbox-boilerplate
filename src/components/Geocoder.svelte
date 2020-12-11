<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import config from '@/app.config';

  import Geolocator from '@/components/Geolocator.svelte';

  const dispatch = createEventDispatcher();

  /*export let marker = true;*/
  export let geolocator = false;
  export let id = 'searchbox';
  export let placeholder = 'Search a place';
  export let center = {
    lat: 48.866667,
    lng: 2.333333,
  };
  let query;

  const focusInput = () => {
    if (query) {
      document.execCommand('selectAll');
    }
  };

  onMount(async () => {
    const autoCompleteModule = await import('@tarekraafat/autocomplete.js');
    const autoComplete = autoCompleteModule.default;
    const ac = new autoComplete({
      data: {
        src: async () => {
          const { lat, lng } = center;
          const token = config.jawg.acccess_token;
          const searchquery = query;
          const source = await fetch(
            `https://api.jawg.io/places/v1/autocomplete?size=10&text=${searchquery}&focus.point.lat=${lat}&focus.point.lon=${lng}&boundary.country=FR&access-token=${token}`,
          );
          const data = await source.json();
          const ret = data.features.reduce((acc, val) => {
            val.properties['geometry'] = val.geometry;
            return [...acc, val.properties];
          }, []);
          return ret;
        },
        key: ['label'],
        cache: false,
      },
      placeHolder: placeholder,
      selector: '#' + id,
      threshold: 2,
      debounce: 200,
      trigger: ['input', 'focus'],
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
        destination: `#search-container-${id}`,
        position: 'beforeend',
        element: 'ul',
      },
      maxResults: 10,
      highlight: true,
      resultItem: {
        content: (data, source) => {
          source.innerHTML = data.label;
        },
        element: 'li',
      },
      noResults: (dataFeedback, generateList) => {
        generateList(ac, dataFeedback, dataFeedback.results);
        const result = document.createElement('li');
        result.setAttribute('class', 'no_result');
        result.setAttribute('tabindex', '1');
        result.innerHTML = `<span>Found No Results for "${dataFeedback.query}"</span>`;
        document.querySelector(`#${ac.resultsList.idName}`).appendChild(result);
      },
      onSelection: (feedback) => {
        const coords = feedback.selection.value.geometry.coordinates;
        query = feedback.selection.value.label;
        dispatch('geocode', { coords });
      },
    });
  });
</script>

<div id="search-container-{id}" class="field jawg-geocoder" class:has-addons={geolocator}>
  <div class="control is-expanded">
    <input
      {id}
      class="input"
      type="text"
      autocomplete="off"
      on:focus={focusInput}
      bind:value={query}
    />
  </div>
  {#if geolocator}
    <div class="control">
      <Geolocator />
    </div>
  {/if}
</div>

<style lang="scss" global>
  @import 'src/styles/_ods-design-system.scss';

  input {
    width: 100%;
  }

  .jawg-geocoder {
    position: relative;
    ul {
      background: white;
      color: black;
      margin-top: 5px;
      border: 1px solid #dbdbdb;
      border-radius: 6px;
      padding: 4px 0;
      position: absolute;
      top: $spacing-300;
      z-index: 1;
      overflow: visible;
      margin-bottom: 10px;
      li {
        padding: 4px 8px;

        &.autoComplete_selected {
          background-color: #f4f4ff;
        }
      }
    }
  }
</style>
