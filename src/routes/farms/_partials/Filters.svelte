<script>
  import FormFilters from '@/components/FormFilters.svelte';
  import Filter from '@/components/Filter.svelte';
  import { facetsInfo } from '../_constants';

  import { stores, goto } from '@sapper/app';
  const { page, session } = stores();

  let form;
  let search = $page.query.search || '';

  const lazySubmit = (event) => {
    console.log(form.value);
  };
</script>

<form action={$page.path} method="get" bind:this={form} on:submit|preventDefault={lazySubmit}>
  <div class="control has-icons-right my-3">
    <input
      class="input"
      type="text"
      id="search"
      name="search"
      autocomplete="off"
      placeholder="Rechercher un producteur/point de vente"
      bind:value={search}
    />
    <span class="icon is-small is-right"> <i class="fas fa-search" /> </span>
  </div>

  <div class="field">
    <div class="control">
      {#each Object.entries($session.facets) as entry (entry)}
        <Filter name={entry[0]} options={entry[1]} selection={$page.query[entry[0]]}>
          <h5 class="subtitle is-5" slot="title">{facetsInfo[entry[0]].title}</h5>
        </Filter>
      {/each}
    </div>
  </div>
</form>

<style lang="scss">
</style>
