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

{#if facets['add_section']}
    <Filter id="add_section" options={facets['add_section']} selection={$page.query['add_section']}
            on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Section</h4>
        <span slot="description">Choisissez une catégorie de produits</span>
    </Filter>
{/if}
{#if facets['cat_iphone']}
    <Filter id="cat_iphone" options={facets['cat_iphone']} selection={$page.query['cat_iphone']} on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Catégorie iPhone</h4>
        <span slot="description">Choisissez une catégorie de produits</span>
    </Filter>
{/if}
{#if facets['type']}
    <Filter id="type" options={facets['type']} selection={$page.query['cat_iphone']} on:select={filterPage}>
        <h4 class="subtitle is-5 has-text-white" slot="title">Services</h4>
        <span slot="description">Type de préstation</span>
    </Filter>
{/if}

<style lang="scss">
    .search {
        margin: 15px 0;
    }
</style>
