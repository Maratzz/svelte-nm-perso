<script lang="ts">
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"
  import TierList from "$lib/components/TierList.svelte"

  let { data } = $props()
  let collection = data.collection
  let collectionFiltered = $derived(collection.filter(item => item.date_released >= "2025-01-01" && item.item_type === "film" && item.status === "finished"))

  const flipDurationMs = 300;

  function handleDndConsider(e: any) {
    collectionFiltered = e.detail.items;
  }
  function handleDndFinalize(e: any) {
    collectionFiltered = e.detail.items;
  }

</script>

<div>
  <h1>Tier List</h1>
  <div use:dndzone="{{items: []}}" onconsider="{handleDndConsider}" onfinalize="{handleDndFinalize}">
    <TierList />
  </div>

  <div class="pool" id="pool" use:dndzone="{{items: collectionFiltered}}" onconsider="{handleDndConsider}" onfinalize="{handleDndFinalize}">
    {#each collectionFiltered as item(item.id)}
      <img src={item.cover} alt="" style="width: 120px;" animate:flip="{{duration: flipDurationMs}}">
    {/each}
  </div>
</div>

<style>
  .pool {
    display: flex;
    flex-flow: row wrap;
  }
</style>
