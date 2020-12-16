<script>
  export let item;
  let tags = item.fields.familles_des_produits;

  $: console.log(item);
  $: console.log(tags);
</script>

<p class="title">{item.fields.nom}</p>
<p class="subtitle">{item.fields.nom_commune}</p>
<hr />
<p>{item.fields.adresse}</p>
<hr />
<p>{item.fields.typologie_ods}</p>
<hr />
<p class="title is-size-6">Type de produits</p>

<div class="tags">
  {#each tags as tag}
    <div class="tag is-medium">{tag}</div>
  {/each}
</div>

<style lang="scss">
</style>
