<script context="module">
	export async function preload(page, session) {
		const { query }	= page;
		const itemId = query.item;

	 /* Fetch data here with this.fetch (special fetch)
	 const res = await this.fetch(`blog/${itemId}.json`);
	 */
		const resFromAPI = await this.fetch('https://data.opendatasoft.com/api/v2/catalog/datasets/arbresremarquablesparis2011%40public/exports/geojson')
		const treeData = await resFromAPI.json()
		return { treeData }
	}
</script>

<script>
import Map from '@/components/Map.svelte';
import Popup from '@/components/Popup.svelte';
import List from '@/components/List.svelte';
import ListItem from '@/components/ListItem.svelte';

export let treeData // is merge with matching data returned by preload
</script>


<div class="columns">
	<div class="column">
		<List>
			{#each treeData.features as tree, index (tree.properties.objectid)}
			<ListItem item={tree} />
			{/each}
		</List>
	</div>
	<div class="column is-two-thirds">
		<Map />
	</div>
</div>

<!-- <ul>
	Same page navigation with query string
	<li><a href="?item=1">1</a></li>
	<li><a href="?item=2">2</a></li>
	<li><a href="?item=3">3</a></li>
</ul> -->

<!-- {#if itemId }
	<Popup id={itemId} />
{/if} -->

<!-- <ul>
	Different page navigation
	<li><a href="items/1">1</a></li>
	<li><a href="items/2">2</a></li>
	<li><a href="items/3">3</a></li>
</ul> -->

<style>
	.columns {
		height: 100%;
		margin-top: 0;
	}

	.column {
		position: relative;
	}

	ul {
		width: 200px;
		margin: 32px;
		position: relative;
		background: white;
		z-index: 10;
	}
</style>
