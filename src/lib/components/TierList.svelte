<script>
  import { SortableList, sortItems } from "@rodrigodagostino/svelte-sortable-list"

  //we want basic sections everytime by default, with name and colors
  let tiers = [{
    name: "Top",
    color: "64, 255, 64",
    content: []
  },
  { name: "Dope",
    color: "207, 255, 64",
    content: []
  },
  { name: "Bof",
    color: "255, 188, 64",
    content: []
  },
  {
    name: "Nope",
    color: "255, 77, 64",
    content: []
  }]

  //we want to be able to add sections manually if needed
  const addTier = (newName, newColor) => {
    let newTier = { name: newName, color: newColor}
    tiers.push(newTier)
    return newTier
  }
</script>

<section>
  {#each tiers as tier}
    <div class="tier">
      <div class="tier-label" style="background-color: rgb({tier.color});">{tier.name}</div>
      {#if tier.content.length}
        <ul class="tier-content">{tier.content}</ul>
      {:else}
        <ul class="tier-content">Drop content here</ul>
      {/if}
    </div>
  {/each}
</section>

<SortableList.Root>
  
</SortableList.Root>

<style>
  .tier {
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
  }

  .tier-label {
    flex-basis: 25%;
    align-content: center;
    text-align: center;
  }
</style>