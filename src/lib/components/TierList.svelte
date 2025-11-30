<script lang="ts">
  import Tier from "./Tier.svelte";

  let { tierSection } : { tierSection: any[] }= $props()

  let newLabel: string = $state("")
  let newColor: string = $state("")

</script>
<section>
  {#each tierSection as tier}
    <Tier tierName={tier.name} --color={tier.color} tierItems={tier.tier_items}/>
  {/each}
</section>

<fieldset class="addTier">
   <input type="text" id="newLabel" placeholder="new tier" bind:value={newLabel}>
  <input type="color" id="newColor" placeholder="new color" bind:value={newColor}>
  <button>Add Tier</button>
</fieldset>

<style>
  .addTier {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }
</style>