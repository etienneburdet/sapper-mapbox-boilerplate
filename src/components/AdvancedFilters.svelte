<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

  const services = ['Producteur', 'Point de vente'];
  const produits = ['Viande', 'Fromage', 'Fruits et légumes'];
  const partenaires = ['La ruche', 'La ferme', 'La la'];

  let selection;

  const updateUrlAndGoto = () => {};
</script>

<div class="filter-title">
  <slot name="title" />
</div>
<div class="select">
  <select bind:value={selection} on:blur={() => updateUrlAndGoto()}>
    <option value="">
      <slot name="description" />
    </option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .filter-title {
    font-size: 0.9em;
    margin-bottom: 5px;
  }

  .select {
    margin-bottom: 15px;
  }
</style>
