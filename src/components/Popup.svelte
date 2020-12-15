<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  const queryparams = new URLSearchParams($page.query);

  export let item;

  queryparams.delete('location');
</script>

<div class="popup">
  <a rel="prefetch" href="/farms/all?{queryparams.toString()}"> <i class="fas fa-times" /> </a>
  <p class="title">{item.fields.nom}</p>
  <p class="subtitle">{item.fields.nom_commune}</p>
  <hr />
  <p>{item.fields.adresse}</p>
  <hr />
  <p>
    {item.fields.typologie_ods}
  </p>
  <hr />
  <p class="title is-size-6">Type de produits</p>
  <div class="tags">
    {#each item.fields.familles_des_produits.toString().split(',') as type}
      <div class="tag is-medium">{type}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  .popup {
    height: 100%;
    width: 100%;

    a {
      color: black;
      font-size: 1.2em;
      float: right;
    }

    .tag:not(body).is-medium {
      font-size: 0.9rem;
    }
  }
</style>
