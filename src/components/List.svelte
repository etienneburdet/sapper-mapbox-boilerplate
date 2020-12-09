<script>
  export let activeItem

  let id = undefined;
  $: id = activeItem && activeItem.fields.objectid
</script>

<div>
  <slot {id}></slot>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    overflow-y: scroll;
  }
</style>
