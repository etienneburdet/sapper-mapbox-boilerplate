<script>
  import { itemTemplate } from '../plugins/ods-templates';
  import { stores } from '@sapper/app';
  const { page } = stores();
  const searchparams = new URLSearchParams($page.query);

  export let id;
  export let fields;
  export let geometry;
  export let active;

  let item;

  searchparams.set('location', geometry.coordinates.toString());
</script>

<a href="/farms/{id}?{searchparams.toString()}">
  <div class:has-background-light={active}>
    <slot />
  </div>
</a>

<style lang="scss">
  div {
    padding: 20px 15px;
    border-left: 8px solid black;
    border-bottom: 1px solid #dddddd;
  }
</style>
