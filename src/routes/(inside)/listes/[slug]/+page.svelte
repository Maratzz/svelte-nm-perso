<script>
  import { enhance } from "$app/forms"
  import { invalidateAll } from "$app/navigation"
  import { dndzone } from "svelte-dnd-action"

  import Tier from "$lib/components/Tier.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  let { data } = $props()
  let { liste, session, supabase } = $derived(data)
  let temporaryList = $derived(liste)
  let itemsToSort = $state([])
  let itemType = $state("")
  let itemTag = $state("")
  let itemName = $state("")
  let yearReleased = $state("")
  let dateFinishedStart = $state("")
  let dateFinishedEnd = $state("")
  let itemAuthor = $state("")
  let hiddenTags = $state("")

  let flipDurationMs = 300

  function updateTierItems(tierId, newItems) {
    temporaryList = {
      ...temporaryList,
      tiers: temporaryList.tiers.map(tier => {
        if (tier.id === tierId) {
          return { ...tier, tier_items: newItems }
        }
        return tier;
      })
    }
  }

  function handleDnd(e) {
    itemsToSort = event.detail.items
  }

  //we populate the items_to_sort with filtered items, using supabase conditional chaining
  async function fetchItems() {
    let query = supabase
      .from("collection")
      .select("*")

    if (itemType) { query = query.eq("item_type", itemType) }
    if (itemTag) { query = query.contains("tags", [itemTag]) }
    if (dateFinishedStart) { query = query.gte("date_finished", dateFinishedStart) }
    if (dateFinishedEnd) { query = query.lte("date_finished", dateFinishedEnd) }
    if (itemName) { query = query.ilike("name", `%${itemName}%`) }
    if (yearReleased) { query = query.gte("date_released", `${yearReleased}-01-01`) }
    if (yearReleased) { query = query.lte("date_released", `${yearReleased}-12-31`) }
    if (itemAuthor) { query = query.contains("author", [itemAuthor]) }
    if (hiddenTags) { query = query.contains("hidden_tags", [hiddenTags])}
    const { data, error } = await query

    if (error) {
      console.error("Error:", error)
      alert(error)
      return
    }

    itemsToSort = data.map(item => ({
      id: item.id,
      collection: item
    }))
  }

  //we send to supabase the updated tierlist
  async function saveTierList() {
    const existingUpdates = []
    const newUpdates = []
    temporaryList.tiers.forEach(tier => {
      tier.tier_items.forEach(item => {
        if (item.item_id) {
          existingUpdates.push({
            id: item.id,
            tier_id: tier.id,
            item_id: item.item_id
          })
        } else {
          newUpdates.push({
            //no id so supabase generates new ones
            tier_id: tier.id,
            item_id: item.collection.id
          })
        }
      })
    })

    //upsert existing items
    for (const update of existingUpdates) {
      const { error } = await supabase
        .from("tier_items")
        .upsert(update)
    }

    //insert new items
    for (const update of newUpdates) {
      const { error } = await supabase
        .from("tier_items")
        .insert(update)
    }

    alert('Tier list saved successfully!');
  }
</script>

<HeadSEO
  title="{temporaryList.name}| Nico Moisson"
  description={temporaryList.description === "" ? "Une liste d'œuvres triées avec le plus grand soin": temporaryList.description}
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>
  <h1>{temporaryList.name}</h1>
  <p>{temporaryList.description}</p>
  <p class="info-small">
    <a href="/listes">Revenir à toutes les listes</a>
  </p>

  <section class="tierlist">
    <!-- all the tiers -->
    {#key temporaryList}
    {#each temporaryList.tiers as tier (tier.id) }
      <!-- svelte-dnd needs items to be isolated so I use a component to hold them -->
      <Tier {tier} items={tier.tier_items} --color={tier.color} isTierlist={temporaryList.is_tierlist} onUpdateItems={(newItems) => updateTierItems(tier.id, newItems)}/>
    {/each}
    {/key}
  </section>

  {#if session}
  <button onclick={saveTierList}>Save Tier List</button>
  <div>

    <form method="GET" onsubmit={fetchItems} id="fetchItemsforTriage">
      <p>Items to sort</p>
      <div>
        <label>date_finished début
          <input type="date" bind:value={dateFinishedStart} placeholder="date_finished_start"/>
        </label>
        <label>date_finished fin
          <input type="date" bind:value={dateFinishedEnd} placeholder="date_finished"/>
        </label>
      </div>
      <label>
        <input list="type" bind:value={itemType} placeholder="item_type" size="15"/>
      </label>
      <label>
        <input list="type" bind:value={yearReleased} placeholder="year_released" size="15"/>
      </label>
      <datalist id="type">
        <option value="film"></option>
        <option value="jeu vidéo"></option>
        <option value="livre"></option>
        <option value="manga"></option>
        <option value="anime"></option>
        <option value="BD"></option>
        <option value="série"></option>
        <option value="série d'animation"></option>
      </datalist>
      <input type="text" bind:value={itemTag} placeholder="tags">
      <input type="text" bind:value={hiddenTags} placeholder="hidden tags">
      <input type="text" bind:value={itemName} placeholder="name">
      <input type="text" bind:value={itemAuthor} placeholder="author">
      <button type="submit">Chercher des objets</button>
    </form>

    <div
      id="items_to_sort"
      class="sorting-container"
      use:dndzone={{items: itemsToSort, flipDurationMs}}
      onconsider={handleDnd}
      onfinalize={handleDnd}>

      {#each itemsToSort as item (item.id) }
        <div class="sorting-container-items" data-item-id={item.id}>
          <a href="/collection/{item.collection.slug}">
            <img src={item.collection.cover} alt="Affiche de l'oeuvre {item.collection.name}">
          </a>
        </div>
      {/each}
    </div>

  </div>

  <form action="?/insertNewTier" method="POST" use:enhance>
    <input type="text" name="tier_to_add" placeholder="ajouter un label">
    <input type="color" name="color_for_new_tier">
    <input type="number" name="tier_order">
    <input type="hidden" name="tierlist" value={liste.id}>
    <button type="submit">Ajouter le tier</button>
    <button formaction="?/insertDefaultTiers">Ajouter les tiers par défaut</button>
  </form>
  {/if}
</div>

<style lang="scss">
  .sorting-container {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    gap: 10px;
    max-height: 340px;
    max-width: 90vw;
    overflow: auto;
    z-index: 5;
    background-color: rgb(213, 187, 238);
    border: 1px solid black;
    &-items img {
      width: 100px;
      aspect-ratio: 3/4;
      object-fit: cover;
    }
  }

  @media (min-width: 900px) {
    .sorting-container {
      position: fixed;
      top: 100px;
      right: 30px;
      max-width: 350px;
      max-height: 80vh;
    }
  }

  #fetchItemsforTriage {
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }
</style>