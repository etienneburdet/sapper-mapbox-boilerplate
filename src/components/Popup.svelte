<script>
  import { stores } from '@sapper/app';
  import { popupTemplate } from '../plugins/ods-templates';
  const { page } = stores();
  const queryparams = new URLSearchParams($page.query);

  export let item;

  let popup;

  $: popup && item && (popup.innerHTML = popupTemplate(item));

  queryparams.delete('location');
</script>

<div class="popup">
  <a rel="prefetch" href="/farms/all?{queryparams.toString()}"> <i class="fas fa-times" /> </a>
    <div class="popup-content" bind:this={popup} ></div>
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
