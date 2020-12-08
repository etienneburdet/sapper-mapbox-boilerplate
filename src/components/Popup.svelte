<script>
  export let text;
  // let { libellefrancais, arrondissement } = point.properties;
</script>

<div>
  <h4>{text}</h4>
  <a rel="prefetch" href="/items/0">close</a>
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
