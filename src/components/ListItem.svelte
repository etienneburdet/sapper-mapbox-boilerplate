<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  const querystring = new URLSearchParams($page.query).toString();

  export let id;
  export let fields;
  export let active;
</script>

<a rel="prefetch" href="/trees/{id}?{querystring}">
  <div class="item" class:has-background-light={active}>
    <p class="title is-size-5">{fields.libellefrancais}</p>
    <p class="subtitle is-size-6">{fields.adresse}</p>
    <div class="tags">
      <div class="tag is-medium">{fields.typeemplacement}</div>
      <div class="tag is-medium">{fields.stadedeveloppement}</div>
      <div class="tag is-medium">{fields.domanialite}</div>
    </div>
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
