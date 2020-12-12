<script>
  import { onMount } from 'svelte';

  export let segment;
  let open = false;
  let openbtn;
  let closeBtn;
  let ul;

  onMount(() => {
    ul.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
        open = false;
      }
    });
  });
</script>

<nav class:open>
  <div class="header-container is-flex is-justify-content-center is-align-items-center is-mobile">
    <img class="header-logo" src="/mstile-150x150.png" />
    <div class="header-menu">
      <div class="header-menu-top">
        <p>MENU</p>
        <i class="header-menu-close fas fa-times" on:click={(open = false)} />
      </div>
      <ul bind:this={ul}>
        <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">home</a></li>
        <li><a aria-current={segment === 'trees' ? 'page' : undefined} href="trees">trees</a></li>
        <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">about</a></li>

        <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
                     the blog data when we hover over the link or tap it on a touchscreen -->
        <li>
          <a
            on:click={(open = true)}
            rel="prefetch"
            aria-current={segment === 'partners' ? 'page' : undefined}
            href="partners"
          >partners</a>
        </li>
      </ul>
    </div>
    <div class="burger is-align-items-center is-mobile">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded={open ? true : false}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  </div>
</nav>

<style lang="scss">
  @import '../styles/global.scss';

  nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    font-weight: 300;
    padding: 0 1em;
    z-index: 10;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);

    .burger {
      display: none;
      position: absolute;
      right: 0;

      .navbar-burger {
        height: 50px;
        width: 50px;
      }
    }

    .header-container {
      display: flex;
      align-items: center;

      .header-logo {
        height: 50px;
      }

      .header-menu-top {
        display: none;

        .header-menu-close {
          font-size: 1.8em;
          margin-bottom: 3px;
          cursor: pointer;
        }
      }

      ul {
        display: flex;
        margin: 0;
        padding: 0;

        li {
          font-size: 0.9em;
          padding-left: 30px;

          a {
            padding: 0;
            color: black;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: $mobile) {
    nav {
      height: 50px;

      .burger {
        display: flex;
      }

      .header-container {
        .header-logo {
          height: 30px;
        }

        ul {
          display: none;
          margin: 60px 0;

          li {
            font-size: 1.2em;
            font-weight: 400;
            padding-left: 0;

            &:not(:first-child) {
              padding-top: 30px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: $mobile) {
    nav.open {
      .header-menu {
        .header-menu-top {
          display: flex;
          justify-content: space-between;
        }

        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
        z-index: 100;
        padding: 15px 30px;

        ul {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

  /*[aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100%);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }*/
</style>
