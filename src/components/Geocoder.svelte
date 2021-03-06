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
  let input;
  let hiddenInput;
  let ac;

  const selectAll = () => {
    input.select();
  };

  const preventSubmit = (e) => {
    if (e.code == "Enter") e.preventDefault();
  };

  const setCoords = (event) => {
    input.value = 'Votre position';
    hiddenInput.value = event.detail.coords;
    dispatch('geocode', { marker: event.detail.coords, location: event.detail.coords });
  };

  onMount(async () => {
    const autoCompleteModule = await import('@tarekraafat/autocomplete.js');
    const autoComplete = autoCompleteModule.default;
    ac = new autoComplete({
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
      selector: `#${id}`,
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
        result.innerHTML = `<span>Aucun résultat trouvé pour "${dataFeedback.query}"</span>`;
        document.querySelector(`#${ac.resultsList.idName}`).appendChild(result);
      },
      onSelection: (feedback) => {
        const coords = feedback.selection.value.geometry.coordinates;
        query = feedback.selection.value.label;
        hiddenInput.value = coords;
        dispatch('geocode', { marker: coords, location: coords });
      },
    });
  });
</script>

<div
  id="search-container-{id}"
  class="field jawg-geocoder is-flex-grow-1"
  class:has-addons={geolocator === 'add-on'}
  class:is-grouped={geolocator === 'separate'}
>
  <div class="control is-expanded">
    <input
      {id}
      class="input is-fullwidth"
      type="text"
      autocomplete="off"
      bind:value={query}
      bind:this={input}
      on:focus={selectAll}
      on:keypress={preventSubmit}
    />
    <input type="hidden" name="marker" bind:this={hiddenInput} on:submit|preventDefault />
  </div>
  {#if geolocator}
    <div class="control">
      <Geolocator on:geolocate={setCoords} />
    </div>
  {/if}
</div>

<style lang="scss" global>
  @import 'src/styles/_project-vars';

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
