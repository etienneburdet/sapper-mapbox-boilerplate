<script context="module">
  export async function preload(page, session) {}
</script>

<script>
  import { goto } from '@sapper/app';

  import Geocoder from '@/components/Geocoder.svelte';

  const navigateToCoords = (event) => {
    const [lng, lat] = event.detail.coords;
    goto(`/farms/0?coords=${lng},${lat}`);
  };
</script>

<section class="section has-background-light">
  <div class="container">
    <h1 class="title is-1">Producteurs d'à côté</h1>
    <p>
      <strong>Trouver des produits fermiers à côté de chez vous.</strong>Une carte vous permet de
      localiser facilement tous les points de vente de produits agricoles locaux accessibles sur les
      plateformes de nos partenaires.
    </p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <figure class="image is-128x128">
          <img height="245" width="195" src="https://bulma.io/images/placeholders/128x128.png" />
        </figure>
      </div>
      <div class="column">
        <Geocoder id="home-search" geolocator={true} on:geocode={navigateToCoords} />
        <div class="field is-grouped">
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
          <p class="control"><button class="button is-info"> Search </button></p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section has-background-light">
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

<style lang="scss">
</style>
