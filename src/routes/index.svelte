<script context="module">
  import { treesUrl, getGeojsonEndpoint } from '@/plugins/ods-data';

  const treesGeojsonEndpoint = getGeojsonEndpoint(treesUrl);

  export async function preload(page) {
    const { query } = page;
    const activePointId = parseInt(query.tree, 10);
    /* Fetch data here with this.fetch (special fetch)
   const res = await this.fetch(`blog/${itemId}.json`);
   */

    const resFromAPI = await this.fetch(treesGeojsonEndpoint);
    const treeData = await resFromAPI.json();
    const activePoint = treeData.features.find((feature) => {
      const featId = feature.properties.objectid;
      return featId === activePointId;
    });
    return { treeData, activePoint };
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
  export let activePoint;

  const setActivePoint = (event) => {
    [activePoint] = event.detail.mapevent.features;
    goto(`/?tree=${activePoint.properties.objectid}`);
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
			<slot></slot>
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

<!-- <u>
	Same page navigation with query string
	<li><a href="?item=1">1</a></li>
	<li><a href="?item=2">2</a></li>
	<li><a href="?item=3">3</a></li>
</ul> -->

<!-- <ul>
	Different page navigation
	<li><a href="items/1">1</a></li>
	<li><a href="items/2">2</a></li>
	<li><a href="items/3">3</a></li>
</ul> -->
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
