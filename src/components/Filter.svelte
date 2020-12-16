<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let options;
  export let name;
  export let selection;

  const dispatchChoice = () => {
    const choice = {};
    choice[id] = selection;
    dispatch('select', choice);
  };
</script>

<slot name="title" />
<div class="select is-fullwidth mb-5">
  <select {name} bind:value={selection} on:change={dispatchChoice}>
    <option value="">
      <slot name="description" />
    </option>
    {#each options as option}
      <option value={option.value}>{option.name || option}</option>
    {/each}
  </select>
</div>

<style lang="scss">
</style>
