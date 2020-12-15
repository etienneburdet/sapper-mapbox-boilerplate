<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  const searchparams = new URLSearchParams($page.query); //.toString();

  export let id;
  export let fields;
  export let geometry;
  export let active;

  searchparams.set('location',geometry.coordinates.toString());
</script>

<a href="/farms/{id}?{searchparams.toString()}">
  <div class="item" class:has-background-light={active}>
    <p class="title is-size-5">{fields.nom.toString()!="null"?fields.nom:"Nom non renseigné"}</p>
    <p class="subtitle is-size-6">{fields.adresse.toString()!="null"?fields.adresse:"Adresse non renseigné"}</p>
    <div class="tags">
      <div class="tag is-medium">{fields.nom_commune.toString()!="null"?fields.nom_commune:"Commune non renseigné"}</div>
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
