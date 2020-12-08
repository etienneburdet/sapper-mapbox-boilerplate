<script context="module">
  import { treesGeojsonEndpoint, getTreeRecordEndpoint } from './_helpers';

  export async function preload(page, session) {
    const { id } = page.params;
    let treeDetails = undefined;
    if (id !== '0') {
      const resFromAPI = await this.fetch(getTreeRecordEndpoint(`objectid=${id}`));
      const jsonFromAPI = await resFromAPI.json();
      treeDetails = jsonFromAPI.records[0].record;
    }

    let { treesData } = session;
    if (!treesData) {
      const resFromAPI = await this.fetch(treesGeojsonEndpoint);
      treesData = await resFromAPI.json();
      session.treesData = treesData;
    }
    return { treesData, treeDetails };
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
  import { setActivePoint } from './_helpers';

  export let treesData;
  export let treeDetails;
</script>

<div class="columns">
  <div class="column is-one-third">
    <List>
      {#each treesData.features as tree, index (tree.properties.objectid)}
        <ListItem
          id={tree.properties.objectid}
          title={tree.properties.libellefrancais}
          description={tree.properties.arrondissement}
          active={false}
        />
      {/each}
    </List>
  </div>
  <div class="column is-two-thirds">
    <div id="infobox" class="box">
      {#if treeDetails}
        <Popup item={treeDetails} />
      {/if}
    </div>
    <Map>
      <MapSource id="trees" data={treesData}>
        <MapLayer id="trees-circles" type="circle" {paint} on:mapClick={setActivePoint} />
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
</style>
