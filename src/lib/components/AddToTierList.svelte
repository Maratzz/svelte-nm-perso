<script>
  import { invalidateAll } from "$app/navigation"
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
  let isSubmitting = false
  let submitError = null
  let submitSuccess = false

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
      selectedTierID = null
      selectedTierName = null
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
    }
  }

  async function handleTierLoading(event) {
    const selectedOption = tiers.find( (tier) => tier.id == event.target.value )
    if ( selectedOption ) {
      selectedTierID = selectedOption.id
      selectedTierName = selectedOption.name
    }
  }

  async function handleSubmit() {
    if (!selectedTierID || !selectedTierlistID) {
      submitError = "il faut choisir une tierlist + un tier d'abord"
      return
    }
    isSubmitting = true
    submitError = null
    submitSuccess = false

    const { data, error } = await supabase
     .from("tier_items")
     .insert({
        tier_id: selectedTierID,
        item_id: itemID
     })
     .select()
     if (error) {
      if (error.code === "23505") {
        submitError = "cette oeuvre est déjà dans ce tier"
        isSubmitting = false
      } else {
        submitError = "Erreur lors de l'ajout:" + error.message
      }
     } else {
      isSubmitting = false
      submitSuccess = true
      await invalidateAll()
     }
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

  <button type="submit" on:click={handleSubmit}>{ isSubmitting ? "Ajout en cours..." : "Valider" }</button>

  {#if submitError}
    <p>{submitError}</p>
  {/if}
  {#if submitSuccess}
    <p>Oeuvre ajoutée à la tierlist !</p>
  {/if}
</div>