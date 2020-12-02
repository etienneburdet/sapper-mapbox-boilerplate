<script context="module">
	export async function preload(page, session) {
    console.log("page params", page.params)
		const { id } = page.params;

    /* Fetch data here with this.fetch (special fetch)
    const res = await this.fetch(`blog/${itemId}.json`);
    */

		return { id };
	}
</script>

<script>
  export let id;
</script>

<h1>I am item {id} full page</h1>
