<script>
  import { supabase } from "$lib/utils/supabaseClient"
  import { onMount } from "svelte"

  export let item

  onMount(async () => {
    await fetchTierlists()
  })

  let tierlists = []
  let tiers = []
  let selectedTierlistID // Store the ID for queries
  let selectedTierlistName // Store the name for display
  let selectedTierID // store the tier ID
  let selectedTierName // store the tier name for display
  let itemID = item.id

  async function fetchTierlists() {
    const { data, error } = await supabase
      .from("tier_lists")
      .select("*")
      .order("year", { ascending: false })

    if (error) {
      console.log("erreur dans le fetch des tierlists:", error)
    } else {
      tierlists = data
    }
  }

  async function handleTierListLoading(event) {
    const selectedOption = tierlists.find( (tierlist) => tierlist.id == event.target.value )
    if (selectedOption) {
      selectedTierlistID = selectedOption.id
      selectedTierlistName = selectedOption.name
      await fetchTiers(selectedTierlistID)
    }
  }

  async function fetchTiers(tierlistID) {
    const { data, error } = await supabase
      .from("tiers")
      .select("id, tier_list_id, order, name")
      .eq("tier_list_id", tierlistID)
      .order("order", { ascending: true })

    if (error) {
      console.log("erreur dans le fetch des tiers:", error)
    } else {
      tiers = data
      console.log("tiers fetched:", tiers)
    }
  }

  async function handleTierLoading(event) {
    const selectedOption = tiers.find( (tier) => tier.id == event.target.value )
    if ( selectedOption ) {
      selectedTierID = selectedOption.id
      selectedTierName = selectedOption.name
    }
    console.log("selectedTierID:", selectedTierID)
    console.log("selectedTierName:", selectedTierName)
  }

  async function handleSubmit() {
    console.log("tier:", selectedTierID)
    console.log("item:", itemID)
  }
</script>

<div>
  <h3>Ajouter à la tierlist</h3>

  <!-- Tierlist Selection -->
  <label for="tierlists">Choisis une tierlist</label>
  <input
    list="tierlistOptions"
    id="tierlists"
    name="tierlists"
    on:change={handleTierListLoading}
    placeholder="Tape pour charger les tierlists"
    value={selectedTierlistName || ""}
  />
  <datalist id="tierlistOptions">
    {#each tierlists as tierlist}
      <option value={tierlist.id}>{tierlist.name}</option>
    {/each}
  </datalist>

  <!-- Tier Selection -->
  <label for="tiers">Choisis un tier</label>
  <input
    list="tierOptions"
    id="tiers"
    name="tiers"
    placeholder="Choisis un tier"
    disabled={!selectedTierlistID}
    value={selectedTierName || ""}
    on:change={handleTierLoading}
  />
  <datalist id="tierOptions">
    {#each tiers as tier}
      <option value={tier.id}>{tier.name}</option>
    {/each}
  </datalist>

  <button type="submit" on:click={handleSubmit}>Ajouter à la tierlist</button>
</div>