<script context="module">
	export async function preload(page) {
		const { query }	= page;
		const itemId = query.item

	 /* Fetch data here with this.fetch (special fetch)
	 const res = await this.fetch(`blog/${itemId}.json`);
	 */

		return { itemId }
	}
</script>

<script>
import Map from '@/components/Map.svelte'
import Popup from '@/components/Popup.svelte'

export let itemId // is merge with matching data returned by preload
</script>

<Map />

<ul>
	Same page navigation with query string
	<li><a href="?item=1">1</a></li>
	<li><a href="?item=2">2</a></li>
	<li><a href="?item=3">3</a></li>
</ul>

{#if itemId }
	<Popup id={itemId} />
{/if}

<ul>
	Different page navigation
	<li><a href="items/1">1</a></li>
	<li><a href="items/2">2</a></li>
	<li><a href="items/3">3</a></li>
</ul>

<style>
	ul {
		width: 200px;
		margin: 32px;
		position: relative;
		background: white;
		z-index: 10;
	}
</style>
