<script>
  import Geocoder from '@/components/Geocoder.svelte';
</script>

<section class="section has-background-light has-text-centered">
  <div class="container">
    <h1 class="title is-1 has-text-weight-bold">
      Producteurs
      <span class="has-text-info">d'à côté</span>
    </h1>
    <p>
      <strong>Trouver des produits fermiers à côté de chez vous.</strong>Une carte vous permet de
      localiser facilement tous les points de vente de produits agricoles locaux accessibles sur les
      plateformes de nos partenaires.
    </p>
  </div>
</section>
<section class="section has-background-primary">
  <div class="container">
    <div class="columns">
      <div class="column">
        <figure class="image is-128x128">
          <img
            height="245"
            width="195"
            alt="bulma placeholder"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </figure>
      </div>
      <div class="column">
        <form action="/farms/all" method="get">
          <Geocoder id="home-search" geolocator="add-on" />
          <div class="columns">
            <div class="column">
              <div class="field">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select name="typologie_ods">
                      <option value="">Choisissez un type de service</option>
                      <option value="Producteur">Producteur</option>
                      <option value="Vente à la ferme">Vente à la ferme</option>
                      <option value="Marché de producteurs">Marché de producteurs</option>
                      <option value="Point de retrait">Point de retrait</option>
                      <option value="Magasin de producteurs">Magasin de producteurs</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-narrow">
              <div class="field">
                <p class="control">
                  <button type="submit" class="button is-danger"> Search </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
<section class="section has-background-light has-text-centered">
  <div class="container">
    <h2 class="title is-2">Notre démarche en toute transparence</h2>
    <p>
      Cette plateforme est le fruit d'un partenariat entre les chambres d'agriculture et le
      ministère de l'Agriculture et de l'Alimentation ouvert à toutes les plateformes de vente
      directe de produits agricoles. Tous ensemble nous avons souhaité unir nos forces pour offrir
      un point d'entrée unique aux consommateurs facilitant la recherche de produits fermiers de
      proximité et une visibilité renforcée aux agricultrices et agriculteurs adhérents des
      plateformes partenaires. Nous partageons l'objectif de favoriser les produits locaux car si
      l'on on veut que notre agriculture reste française, que nos agriculteurs vivent de leur
      métier, chacun d’entre nous doit pouvoir mettre en oeuvre cette volonté citoyenne
      d’accompagner nos agricultures par son acte d'achat.
    </p>
  </div>
</section>
<section class="section has-text-centered">
  <div class="is-flex is-justify-content-space-around mb-5">
    <figure class="image is-128x128">
      <img
        height="245"
        width="195"
        alt="bulma placeholder"
        src="https://bulma.io/images/placeholders/128x128.png"
      />
    </figure>
    <figure class="image is-128x128">
      <img
        height="245"
        width="195"
        alt="bulma placeholder"
        src="https://bulma.io/images/placeholders/128x128.png"
      />
    </figure>
    <figure class="image is-128x128">
      <img
        height="245"
        width="195"
        alt="bulma placeholder"
        src="https://bulma.io/images/placeholders/128x128.png"
      />
    </figure>
    <figure class="image is-128x128">
      <img
        height="245"
        width="195"
        alt="bulma placeholder"
        src="https://bulma.io/images/placeholders/128x128.png"
      />
    </figure>
  </div>

  <button class="button is-danger">Voir nos partenaires</button>
</section>
<footer class="has-text-centered has-background-info">
  <p>
    <strong>Bulma</strong>
    by
    <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is
    licensed
    <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
  </p>
</footer>

<style lang="scss">
  .control button {
    width: 100%;
  }
</style>
