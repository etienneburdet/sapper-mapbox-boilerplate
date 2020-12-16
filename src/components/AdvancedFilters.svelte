<script>
    import Filter from './Filter.svelte';
    import { filterPage, searchPage } from '@/routes/farms/_helpers';

    import { stores } from '@sapper/app';

    const { page, session } = stores();

    export let facets;
    export let pageQueries;

    let input;

    const selectAll = () => {
        input.select();
    };
</script>

<div class="search control has-icons-right">
    <input class="input" type="text" id="search" autocomplete="off"
           placeholder="Rechercher un producteur/point de vente"
           on:change={searchPage} value={$page.query['search'] || ''}
           bind:this={input} on:focus={selectAll}>
    <span class="icon is-small is-right">
      <i class="fas fa-search"></i>
    </span>
</div>

{#if facets['familles_des_produits']}
    <Filter id="familles_des_produits" options={facets['familles_des_produits']} selection={$page.query['familles_des_produits']}
            on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Produits</h4>
        <span slot="description">Choisissez une catégorie de produits</span>
    </Filter>
{/if}
{#if facets['typologie_ods']}
    <Filter id="typologie_ods" options={facets['typologie_ods']} selection={$page.query['typologie_ods']} on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Services</h4>
        <span slot="description">Choisissez un type de service</span>
    </Filter>
{/if}
{#if facets['nom_plateforme_partenaire']}
    <Filter id="nom_plateforme_partenaire" options={facets['nom_plateforme_partenaire']} selection={$page.query['nom_plateforme_partenaire']} on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Source</h4>
        <span slot="description">Choisissez une source de données</span>
    </Filter>
{/if}

<style lang="scss">
    .search {
        margin: 15px 0;
    }
</style>
