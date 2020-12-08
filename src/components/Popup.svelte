<script>
  export let item;
  // let { libellefrancais, arrondissement } = point.properties;
</script>

<div>
  <p>{JSON.stringify(item)}</p>
  <a rel="prefetch" href="/trees/0">close</a>
</div>

<style>
  div {
    height: 200px;
    width: 200px;
    background: white;
    position: relative;
    z-index: 10;
  }
</style>
