<script context="module">
import { treesUrl, getGeojsonEndpoint } from '@/plugins/ods-data';

const treesGeojsonEndpoint = getGeojsonEndpoint(treesUrl);

export async function preload(page, session) {
  const { id } = page.params;
  let { treeData } = session;

  /* Fetch data here with this.fetch (special fetch)
  const res = await this.fetch(`blog/${itemId}.json`);
  */
  if (!treeData) {
    const resFromAPI = await this.fetch(treesGeojsonEndpoint);
    treeData = await resFromAPI.json();
    session.treeData = treeData;
  }
  return { treeData, id };
}
</script>

<script>
  import { goto } from '@sapper/app';
  import Map from '@/components/Map.svelte';
  import MapSource from '@/components/MapSource.svelte';
  import MapLayer from '@/components/MapLayer.svelte';
  import Popup from '@/components/Popup.svelte';
  import List from '@/components/List.svelte';
  import ListItem from '@/components/ListItem.svelte';

  import paint from './_mapstyle';

  export let treeData; // is merge with matching data returned by preload
  export let id;

  const setActivePoint = (event) => {
    const [point] = event.detail.mapevent.features;
    goto(`/items/${point.properties.objectid}`);
  };
</script>

<div class="columns">
  <div class="column is-one-third">
    <List>
      {#each treeData.features as tree, index (tree.properties.objectid)}
        <ListItem
          id={tree.properties.objectid}
          title={tree.properties.libellefrancais}
          description={tree.properties.arrondissement}
        />
      {/each}
    </List>
  </div>
  <div class="column is-two-thirds">
    <div id="infobox" class="box">
      {#if id !== '0'}
        <Popup text={id} />
      {/if}
    </div>
    <Map>
      <MapSource id="trees" data={treeData}>
        <MapLayer
          id="trees-circles"
          type="circle"
          {paint}
          on:mapClick={setActivePoint}
        />
      </MapSource>
    </Map>
  </div>
</div>

<style>
  #infobox {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  .columns {
    height: 100%;
    width: 100%;
    margin-top: 0;
    overflow: hidden;
  }

  .column {
    position: relative;
    height: 100%;
    width: 100%;
  }

  ul {
    width: 200px;
    margin: 32px;
    position: relative;
    background: white;
    z-index: 10;
  }
</style>
