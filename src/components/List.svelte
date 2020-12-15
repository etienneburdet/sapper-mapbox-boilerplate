<script>
  export let activeItem;

  let id;
  $: id = activeItem && activeItem.fields.objectid;
</script>

<div class="has-background-white">
  <slot {id} />
</div>

<style>
  div {
    position: relative;
    height: 100%;
  }
</style>
