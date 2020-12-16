<script>
  import { stores } from '@sapper/app';
  import { popupTemplate } from '../plugins/ods-templates';
  const { page } = stores();

  export let href = '/';
  let queryparams;

  $: {
    queryparams = new URLSearchParams($page.query);
    queryparams.delete('location');
  }
</script>

<a href="{href}?{queryparams.toString()}">
  <slot />
</a>
