<script>
  import TierList from "$lib/components/TierList.svelte"
  import ItemTier from "$lib/components/ItemTier.svelte"
  import { onMount } from "svelte"

  let { data } = $props()
  let tierlist = $state(data.tierlist[0])
  console.log(tierlist)

</script>

<div>
  <h1>Tier List</h1>
  <TierList tierlistName={tierlist.name} tierSection={tierlist.tiers}/>
</div>
