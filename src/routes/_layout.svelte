<script>
	import Nav from '@/components/Nav.svelte';
	import Map from '@/components/Map.svelte';

	export let segment;
</script>

<svelte:head>
	<style src="../styles/global.scss"></style>
</svelte:head>

<Nav {segment}/>

<main>
 		<slot></slot>
</main>

<style lang="scss">
main {
	position: relative;
	background-color: white;
	margin: 0 auto;
	box-sizing: border-box;
}
</style>
