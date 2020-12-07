<script context="module">
	import { treesUrl, getGeojsonEndpoint} from '@/plugins/ods-data.js';

	const treesGeojsonEndpoint = getGeojsonEndpoint(treesUrl)

	export async function preload(page, session) {
		const { query }	= page;
		const itemId = query.item;

	 /* Fetch data here with this.fetch (special fetch)
	 const res = await this.fetch(`blog/${itemId}.json`);
	 */

		const resFromAPI = await this.fetch(treesGeojsonEndpoint)
		const treeData = await resFromAPI.json();

		return { treeData };
	}
</script>

<script>
import Map from '@/components/Map.svelte';
import MapSource from '@/components/MapSource.svelte';
import MapLayer from '@/components/MapLayer.svelte';
import Popup from '@/components/Popup.svelte';
import List from '@/components/List.svelte';
import ListItem from '@/components/ListItem.svelte';

import paint from './_mapstyle.js';

export let treeData // is merge with matching data returned by preload
const setActive = (event) => {
	console.log(event.detail.layerId)
}
</script>

<div class="columns">
	<div class="column is-one-third">
		<List>
			{#each treeData.features as tree, index (tree.properties.objectid)}
				<a href="?tree={tree.properties.objectid}">
					<ListItem
						title={tree.properties.libellefrancais}
						description={tree.properties.arrondissement}
					/>
				</a>
			{/each}
		</List>
	</div>
	<div class="column is-two-thirds">
		<Map>
			<MapSource layerId="trees" data={treeData}>
				<MapLayer
					id="trees-circles"
					type="circle"
					{paint}
					on:mapClick={setActive}
				/>
			</MapSource>
		</Map>
	</div>
</div>

<!-- <u>
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
		width: 100%;
		margin-top: 0;
		overflow: hidden;
	}

	.column {
		height: 100%;
		width: 100%;
	}

	ul {
		width: 200px;
		margin: 32px;
		position: relative;
		background: white;
		z-index: 10;
	}
</style>
