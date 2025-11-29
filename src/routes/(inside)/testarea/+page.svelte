<script lang="ts">
  import { SortableList, sortItems, scaleFly } from '@rodrigodagostino/svelte-sortable-list'
  import TierList from "$lib/components/TierList.svelte"
  import ItemPool from '$lib/components/ItemPool.svelte'

  export let data
  let collection = data.collection
  let collectionFiltered = collection.filter(item => item.date_released >= "2025-01-01" && item.item_type === "film" && item.status === "finished")

  function handleDragEnd(e: SortableList.RootEvents['ondragend']) {
		const { draggedItemIndex, targetItemIndex, isCanceled } = e;
		if (!isCanceled && typeof targetItemIndex === 'number' && draggedItemIndex !== targetItemIndex)
			collectionFiltered = sortItems(collectionFiltered, draggedItemIndex, targetItemIndex);
	}

</script>

<div>
  <h1>Tier List</h1>
  <TierList/>

  <!-- <div class="itemPool">
    {#each collectionFiltered as item}
      <img src={item.cover} alt="" class="item">
    {/each}
  </div> -->

  <ItemPool itemPool={collectionFiltered}/>
</div>

