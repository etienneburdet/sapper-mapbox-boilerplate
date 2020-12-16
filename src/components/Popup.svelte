<script>
  import { stores } from '@sapper/app';

  import BackButton from './BackButton.svelte';

  const { page } = stores();

  let queryparams;
  let popup;

  $: {
    queryparams = new URLSearchParams($page.query);
    queryparams.delete('location');
  }
</script>

<div>
  <BackButton href="/farms/all">
    <span class="icon has-text-dark is-pulled-right"><i class="fa fa-times fa-lg" /></span>
  </BackButton>
  <slot />
</div>

<style lang="scss">
  div {
    height: 100%;
    width: 100%;
  }
</style>
