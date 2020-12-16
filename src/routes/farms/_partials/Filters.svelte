<script>
  import FormFilters from '@/components/FormFilters.svelte';
  import Filter from '@/components/Filter.svelte';
  import { facetsInfo } from '../_constants';
  import { filterPage, searchPage } from '../_helpers';

  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';

  const { page } = stores();

  export let facets;

  let input;
</script>

<div class="field has-addons py-3">
  <div class="control is-expanded">
    <input
      class="input is-fullwidth"
      type="text"
      id="search"
      name="search"
      autocomplete="off"
      placeholder="Rechercher un producteur/point de vente"
      value={$page.query.search || ''}
      bind:this={input}
      on:focus={() => input.select()}
      on:change={searchPage}
    />
  </div>
  <div class="control">
    <button class="button is-dark">
      <span class="icon is-small is-right"> <i class="fas fa-search" /> </span>
    </button>
  </div>
</div>

<div class="field">
  <div class="control">
    {#each Object.entries(facets) as entry (entry)}
      <Filter
        name={entry[0]}
        options={entry[1]}
        selection={$page.query[entry[0]]}
        on:select={filterPage}
      >
        <h5 class="subtitle is-5" slot="title">{facetsInfo[entry[0]].title}</h5>
        <span slot="description">{facetsInfo[entry[0]].description}</span>
      </Filter>
    {/each}
  </div>
</div>

<style lang="scss">
</style>
