<script>
  import { onMount } from 'svelte';

  export let segment;
  let open = false;
  let openbtn;
  let closeBtn;
  let ul;

  const toggleMenu = () => (open = !open);
  const closeMenu = () => (open = false);
</script>

<nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/" class:is-hidden={segment === undefined}>
      <h3 class="title is-3">Producteur <span class="has-text-info">d'à côté</span></h3>
    </a>

    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      class:is-hidden-desktop={segment === undefined}
      class:is-active={open}
      on:click={toggleMenu}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu has-background-light" class:is-active={open}>
    <div class="navbar-start" style="margin-left: {segment === undefined ? 'auto' : 'unset'}">
      <a
        on:click={closeMenu}
        class="navbar-item"
        rel="prefetch"
        aria-current={segment === undefined ? 'page' : undefined}
        href="."
      >home</a>
      <a
        on:click={closeMenu}
        class="navbar-item"
        rel="prefetch"
        aria-current={segment === 'farms' ? 'page' : undefined}
        href="farms/"
      >farms</a>
      <a
        on:click={closeMenu}
        class="navbar-item"
        rel="prefetch"
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about/"
      >about</a>
      <a
        on:click={closeMenu}
        class="navbar-item"
        rel="prefetch"
        aria-current={segment === 'partners' ? 'page' : undefined}
        href="partners/"
      >partners</a>
    </div>
  </div>
</nav>

<style lang="scss">
  @import 'src/styles/_ods-design-system';

  nav {
    height: 60px;
  }

  [aria-current] {
    text-decoration: underline;
    text-underline-offset: $spacing-100;
  }

  @media screen and (max-width: 768px) {
    nav {
      height: 50px;
    }
  }
</style>
