<script context="module">
	export async function preload(page, session) {
		const { number } = page.params;
    return { number }
	}
</script>

<script>
  export let number
</script>


<p>You opened {number}</p>

<style>
  p {
    background: white;
    z-index: 10;
  }
</style>
