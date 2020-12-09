<script>
  export let id;
  export let title;
  export let description;
  export let active;
</script>

<a rel="prefetch" href="/trees/{id}">
  <article class="media" on:click class:has-background-light={active}>
    <figure class="media-left">
      <p class="image is-64x64"><img src="https://bulma.io/images/placeholders/128x128.png" /></p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h4 class="title is-4">{title}</h4>
        <p>{description}</p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item"> <span class="icon is-small"><i class="fas fa-reply" /></span> </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet" /></span>
          </a>
          <a class="level-item"> <span class="icon is-small"><i class="fas fa-heart" /></span> </a>
        </div>
      </nav>
    </div>
    <div class="media-right"><button class="delete" /></div>
  </article>
</a>

<style lang="scss">
</style>
