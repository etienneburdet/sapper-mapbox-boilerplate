<script>
  export let fields;
</script>

<p class="title is-size-5">{fields.nom.toString() != 'null' ? fields.nom : 'Nom non renseigné'}</p>
<p class="subtitle is-size-6">
  {fields.adresse.toString() != 'null' ? fields.adresse : 'Adresse non renseigné'}
</p>
<div class="tags">
  <div class="tag is-medium">
    {fields.nom_commune.toString() != 'null' ? fields.nom_commune : 'Commune non renseigné'}
  </div>
</div>
