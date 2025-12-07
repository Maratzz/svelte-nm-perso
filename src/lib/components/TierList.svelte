<script lang="ts">
  import Tier from "./Tier.svelte"

  let { tierSection, tierlistID } : { tierSection: any[], tierlistID: number }= $props()
</script>
<section data-tierlist-id={tierlistID}>
  {#each tierSection as tier}
    <Tier tierName={tier.name} --color={tier.color} tierItems={tier.tier_items} tierID={tier.id}/>
  {/each}
</section>