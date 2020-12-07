<script context="module">
	import { treesUrl, getGeojsonEndpoint} from '@/plugins/ods-data.js'

	const treesGeojsonEndpoint = getGeojsonEndpoint(treesUrl)

	export async function preload(page, session) {
		const { query }	= page;
		const itemId = query.item;

	 /* Fetch data here with this.fetch (special fetch)
	 const res = await this.fetch(`blog/${itemId}.json`);
	 */
		const resFromAPI = await this.fetch(treesGeojsonEndpoint)
		const treeData = await resFromAPI.json()
		return { treeData }
	}
</script>

<script>
import Map from '@/components/Map.svelte';
import MapSource from '@/components/MapSource.svelte';
import MapLayer from '@/components/MapLayer.svelte';
import Popup from '@/components/Popup.svelte';
import List from '@/components/List.svelte';
import ListItem from '@/components/ListItem.svelte';

export let treeData // is merge with matching data returned by preload

const paint = {
			'circle-radius': [
					'interpolate', ['linear'], ['zoom'],
					8, 1,
					15, 2,
					19, 6,
					22, 10
			],
			'circle-opacity': 0.8,
			'circle-color': [
					'match',
					['get', 'stadedeveloppement'],
					'A',
					'#317256',
					'J',
					'#398564',
					'JA',
					'#419873',
					'M',
					'#49ab81',
					/* other */ '#52bf90'
			]
	}
</script>


<div class="columns">
	<div class="column is-one-third">
		<List>
			{#each treeData.features as tree, index (tree.properties.objectid)}
			<ListItem
				title={tree.properties.libellefrancais}
				description={tree.properties.arrondissement}
			/>
			{/each}
		</List>
	</div>
	<div class="column is-two-thirds">
		<Map>
			<MapSource id="trees" data={treeData}>
				<MapLayer type="circle" {paint} />
			</MapSource>
		</Map>
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
