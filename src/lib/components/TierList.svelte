<script lang="ts">
  import Tier from "./Tier.svelte"

  let { tierSection, tierlistID, supabase, session } : { tierSection: any[], tierlistID: number, supabase: any, session: any }= $props()
</script>
<section data-tierlist-id={tierlistID}>
  {#each tierSection as tier}
    <Tier tierName={tier.name} --color={tier.color} tierItems={tier.tier_items} tierID={tier.id} {supabase} {session}/>
  {/each}
</section>