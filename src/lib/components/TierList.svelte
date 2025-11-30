<script lang="ts">
  import Tier from "./Tier.svelte"

  let tiers = $state([
    { id: 1, label: "Top", color: "#00FF00"},
    { id: 2, label: "Yop", color: "#AAFF00"},
    { id: 3, label: "Bof", color: "#FFAA00"},
    { id: 4, label: "Nope", color: "#F55C3D"}
  ])

  let newLabel: string = $state("")
  let newColor: string = $state("")
  $inspect(newColor)

  const addNewTier = () => {
    let newTier = { id: tiers. length + 1, label: newLabel, color: newColor}
    tiers.push(newTier)
  }
</script>

<section id="tierlist">
{#each tiers as tier}
  <Tier tierName={tier.label} tierID={tier.id} --color={tier.color}/>
{/each}

<fieldset class="addTier">
   <input type="text" id="newLabel" placeholder="new tier" bind:value={newLabel}>
  <input type="color" id="newColor" placeholder="new color" bind:value={newColor}>
  <button onclick={() => addNewTier()}>Add Tier</button>
</fieldset>

</section>

<style>
  .addTier {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }
</style>