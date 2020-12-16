<script>
  import FormFilters from '@/components/FormFilters.svelte';
  import Filter from '@/components/Filter.svelte';
  import { facetsInfo } from '../_constants';

  import { stores } from '@sapper/app';
  const { page, session } = stores();

  const pouepouet = () => console.log('pouepouet');
</script>

<FormFilters on:submit={pouepouet}>
  <div class="control has-icons-right my-3">
    <input
      class="input"
      type="text"
      id="search"
      name="search"
      autocomplete="off"
      placeholder="Rechercher un producteur/point de vente"
      value={$page.query.search || ''}
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
</FormFilters>

<style lang="scss">
</style>
