<script>
    export let item;
</script>

<div class="popup">
    <a rel="prefetch" href="/trees/0">
        <i class="fas fa-times"></i>
    </a>
    <p class="title">
        {item.fields.add_nom_ferme}
    </p>
    <p class="subtitle">
        {item.fields.add_ville}
    </p>
    <hr/>
    <p>
        {item.fields.add_adresse}
    </p>
    <hr/>
    <p>
        Exploitation familiale depuis 3 générations, située entre Morvan et Charolais, comptant 130 vaches allaitantes nourries par notre propre production de céréales et fourrage. Découpe et transformation directement à la ferme. Accueil et vente directe à la ferme sur rendez-vous. Livraison possible ou envoi chronopost réfrigéré.
    </p>
    <hr/>
    <p class="title is-size-6">
        Type de produits
    </p>
    <div class="tags">
        <div class="tag is-medium">{item.fields.typeemplacement}</div>
        <div class="tag is-medium">{item.fields.stadedeveloppement}</div>
        <div class="tag is-medium">{item.fields.domanialite}</div>
    </div>
</div>

<style lang="scss">
    .popup {
        height: 100%;
        width: 100%;

        a {
            color: black;
            font-size: 1.2em;
            float: right;
        }

        .tag:not(body).is-medium {
            font-size: 0.9rem;
        }
    }
</style>
