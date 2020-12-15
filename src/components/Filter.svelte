<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let options;
  export let id;
  export let selection;

  const dispatchChoice = () => {
    const choice = {};
    choice[id] = selection;
    dispatch('select', choice);
  };
</script>

<div class="filter-title">
  <slot name="title" />
</div>
<div class="select is-fullwidth">
  <select bind:value={selection} on:change={dispatchChoice}>
    <option value="">
      <slot name="description" />
    </option>
    {#each options as option}
      <option value={option.value}>{option.name || option}</option>
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
