<script>
  import {itemTemplate} from '../plugins/ods-templates';
  import { stores } from '@sapper/app';
  const { page } = stores();
  const searchparams = new URLSearchParams($page.query); //.toString();

  export let id;
  export let fields;
  export let geometry;
  export let active;

  let item;

  $: item && (item.innerHTML = itemTemplate(fields));

  searchparams.set('location',geometry.coordinates.toString());
</script>

<a href="/farms/{id}?{searchparams.toString()}">
  <div class="item" class:has-background-light={active} bind:this={item}>
    {itemTemplate(fields)}
  </div>
</a>

<style lang="scss">
  .item {
    padding: 20px 15px;
    border-left: 8px solid black;
    border-bottom: 1px solid #dddddd;
  }
  .tag:not(body).is-medium {
    font-size: 0.9rem;
  }
</style>
