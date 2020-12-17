<script>
    export let fields;

    const prettyPrintDistances = (meters) => {
        if (meters > 1000) {
            return (meters / 1000).toFixed(1) + 'km';
        } else {
            return (meters).toPrecision(0) + 'm.';
        }
    };
</script>

<p class="title is-size-5">{fields.nom.toString() != 'null' ? fields.nom : 'Nom non renseigné'}</p>
<p class="subtitle is-size-6">
  {fields.adresse.toString() != 'null' ? fields.adresse : 'Adresse non renseigné'}
  {#if fields.geo_distance.toString() != 'null'} - <span class="distance">{'<' + prettyPrintDistances(fields.geo_distance)}</span>{/if}
</p>
<div class="tags">
    <div class="tag is-medium">
      {fields.nom_commune.toString() != 'null' ? fields.nom_commune : 'Commune non renseigné'}
    </div>
</div>


<style lang="scss">
    .subtitle {
        .distance {
            color: #000000;
        }
    }
</style>
