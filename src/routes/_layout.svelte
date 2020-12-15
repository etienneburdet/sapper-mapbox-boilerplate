<script>
  import { stores } from '@sapper/app';
  import Nav from '@/components/Nav.svelte';
  import LoadBar from '@/components/LoadBar.svelte';

  const { preloading } = stores();

  export let segment;
</script>

<svelte:head>
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="theme-color" content="#ffffff" />

  <meta name="description" content="A base sapper app for list over maps with calls to ods API" />
  <meta property="og:title" content="ODS Sapper Map Template" />
  <meta
    property="og:description"
    content="A base sapper app for list over maps with calls to ods API"
  />
  <meta property="og:image" content="TODO" />
  <meta property="og:url" content="TOD" />
  <meta name="twitter:card" content="TODO" />

  <meta property="og:site_name" content="Opendatasoft" />
  <meta name="twitter:image:alt" content="Alt text for image" />
  <meta property="fb:app_id" content="your_app_id" />
  <meta name="twitter:site" content="@website-username" />
  <style src="../styles/global.scss">
  </style>
</svelte:head>

{#if $preloading}
  <LoadBar />
{/if}

<Nav {segment} />

<main>
  <slot />
</main>

<style lang="scss">
  main {
    position: relative;
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 70px);
    overflow: hidden;
  }

  @media screen and (max-width: 769px) {
    main {
      height: calc(100% - 50px);
    }
  }
</style>
