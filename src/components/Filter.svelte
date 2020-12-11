<script>
  import { goto } from '@sapper/app';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const services = ['Producteur', 'Point de vente'];
  const partenaires = ['La ruche', 'La ferme', 'La la'];

  export let options;
  export let id;

  let selection;

  const dispatchChoice = () => {
    const choice = {};
    choice[id] = selection;
    dispatch('select', choice);
  };
</script>

<div class="filter-title">
  <slot name="title" />
</div>
<div class="select">
  <select bind:value={selection} on:blur={dispatchChoice}>
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
