<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';


  const services = ['Producteur', 'Point de vente'];
  const produits = ['Viande', 'Fromage', 'Fruits et légumes'];
  const partenaires = ['La ruche', 'La ferme', 'La la'];

  let url;
  let serviceSelected;
  let produitSelected;
  let partenaireSelected;

  onMount(() => {
    url = new URL(window.location);
    serviceSelected = url.searchParams.get('service');
    produitSelected = url.searchParams.get('produit');
    partenaireSelected = url.searchParams.get('partenaire');
  });

  const updateUrlAndGoto = () => {
    if (serviceSelected) {
      url.searchParams.set('service', serviceSelected);
    } else {
      if (url.searchParams.get('service')) {
        url.searchParams.delete('service');
      }
    }
    if (produitSelected) {
      url.searchParams.set('produit', produitSelected);
    } else {
      if (url.searchParams.get('produit')) {
        url.searchParams.delete('produit');
      }
    }
    if (partenaireSelected) {
      url.searchParams.set('partenaire', partenaireSelected);
    } else {
      if (url.searchParams.get('partenaire')) {
        url.searchParams.delete('partenaire');
      }
    }

    goto(url);
  };
</script>

<div class="filter-title">Type de service</div>
<div class="select">
  <select bind:value={serviceSelected} on:change={() => updateUrlAndGoto()}>
    <option value="">Choisissez un service</option>
    {#each services as service}
      <option value={service}>{service}</option>
    {/each}
  </select>
</div>

<div class="filter-title">Type de produit</div>
<div class="select">
  <select bind:value={produitSelected} on:change={() => updateUrlAndGoto()}>
    <option value="">Sélectionnez parmi viande, poisson, légumes, fruits...</option>
    {#each produits as produit}
      <option value={produit}>{produit}</option>
    {/each}
  </select>
</div>

<div class="filter-title">Partenaires</div>
<div class="select">
  <select bind:value={partenaireSelected} on:change={() => updateUrlAndGoto()}>
    <option value="">Sélectionnez un partenaire</option>
    {#each partenaires as partenaire}
      <option value={partenaire}>{partenaire}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .filter-title {
    font-size: 0.9em;
    margin-bottom: 5px;
  }

  .select {
    margin-bottom: 15px;
  }
</style>
