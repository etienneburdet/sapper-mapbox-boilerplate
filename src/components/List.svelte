<script>
  export let activeItem;

  let id;
  $: id = activeItem && activeItem.fields.objectid;
</script>

<div>
  <slot {id}></slot>
</div>

<style>
  div {
    position: relative;
  }
</style>
