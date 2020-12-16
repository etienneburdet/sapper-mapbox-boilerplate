<script>
  import { stores } from '@sapper/app';

  const { page } = stores();
</script>

<form action={$page.path} method="get" on:submit>
  <slot />
</form>
