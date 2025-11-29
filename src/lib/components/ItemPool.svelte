<script lang="ts">
  import { SortableList, sortItems, scaleFly } from '@rodrigodagostino/svelte-sortable-list'

  export let itemPool: any

  function handleDragEnd(e: SortableList.RootEvents['ondragend']) {
		const { draggedItemIndex, targetItemIndex, isCanceled } = e;
		if (!isCanceled && typeof targetItemIndex === 'number' && draggedItemIndex !== targetItemIndex)
			itemPool = sortItems(itemPool, draggedItemIndex, targetItemIndex);
	}
</script>

<SortableList.Root
  ondragend={handleDragEnd}
  direction="horizontal"
  hasWrapping>
  {#each itemPool as item, index (item.id)}
  <SortableList.Item
    {...item}
    {index}
    transitionIn={(node) => scaleFly(node, { duration: 320, x: -200 })}
		transitionOut={(node) => scaleFly(node, { duration: 320, x: 200 })}>
    <img class="item" src={item.cover} alt="">
  </SortableList.Item>
    {/each}
</SortableList.Root>

<style>
  :global(.ssl-root li:before) {
    content: "";
  }

  .item {
    width: 75px;
  }
</style>