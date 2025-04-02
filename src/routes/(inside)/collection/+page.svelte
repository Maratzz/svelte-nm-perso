<script>
  import { fade } from "svelte/transition"
  import CollectionFilter from "$lib/components/CollectionFilter.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import Slider from "$lib/components/Slider.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Form from "$lib/components/Form.svelte"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data
  export let form

  $: ({ collection, categories, status, session, types, gamePlatforms, tags, supabase } = data)
  $: filteredCollection = noNotesChecked === true ? filterDataNoNotes(noNotesChecked) : filteredData(searchInput, selectedCategories, selectedStatus, selectedPlatforms, selectedGamePlatforms, selectedTags, notesChecked, collection)
  $: filteredPlatforms = selectedCategories.length ? supabaseFilter(supabase, selectedCategories).then((data) => filteredPlatforms = data.array) : []

  //whenever these variables change, we update the filteredCollection
  $: searchInput = ""
  $: selectedCategories = []
  $: selectedStatus = []
  $: selectedPlatforms = []
  $: selectedGamePlatforms = []
  $: selectedTags = []
  $: notesChecked = false
  $: noNotesChecked = false

  // controls the page and items-per-page components
  let currentPage = 1
  let pageSize = 12
  $: paginatedItems = paginate({ items: filteredCollection, pageSize, currentPage })

  $: supabaseFilter = async (supabase, categories) => {
    let { data, error } = await supabase
    .from("platforms")
    .select("*")
    .overlaps("type", categories)
    if (error) {
      console.error("erreur", error)
    }
    let array = []
    data.forEach(element => {
      array.push(element)
      return array
    })
    return { array }
  }

  $: filteredData = (search, categories, status, platforms, gamePlatforms, tags, checked, collection) => collection.filter(item => {
      if ( search.length || categories.length || status.length ||platforms.length || gamePlatforms.length || tags.length || checked === true ) {
        currentPage = 1
        return (search.length ? item.name.toLowerCase().includes( search.toLowerCase()) : true) && (categories.length ? categories.includes(item.item_type) : true) && (status.length ? status.includes(item.status) : true) && (platforms.length ? platforms.includes(item.platform) : true) && (gamePlatforms.length ? gamePlatforms.includes(item.game_platform) : true) && (tags.length ? tags.every(tag => item.tags?.includes(tag)) : true) && (checked === true ? item.notes !== (null || "") : true)
      } else {
        return collection
      }
    })

  // SELF: I can check items without notes directly on the frontend part. Not implementing the deep filters as it would be too lenghty for such a small usage.
  $: filterDataNoNotes = (checked) => collection.filter(item => {
    if (checked === true) {
      currentPage = 1
      return (checked === true ? item.notes === (null || ""): true)
    }
  })
</script>

<HeadSEO
  title="Nico Moisson | Collection"
  description="Des oeuvres à n'en plus finir, des listes à n'en plus vouloir"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Collection</h1>

  {#if session}
  <div class="collapsible">

    <input type="checkbox" id="collapsible2" name="collapsible2">
    <label for="collapsible2">Créer une oeuvre</label>

    <div class="collapsible-body">
      <Form {form} {categories} {status} {types} {gamePlatforms}/>
    </div>

  </div>
  {/if}
</div>

<div>
  <input type="text" name="filter-search" id="filter-search" placeholder="Chercher une oeuvre" size="25" bind:value={searchInput}>
</div>

<div class="filter-container">
  <p>Filtrer par type (OR)</p>
  <CollectionFilter categories={types} bind:selectedCategories/>
</div>

<div class="filter-container">
  <p>...par statut (OR)</p>
  <div class="filter">
    {#each status as status}
    <input type="checkbox" name={status.name} id={status.name} value={status.name} bind:group={selectedStatus}>
    <label for={status.name} class="filter__button">{status.converted}</label>
    {/each}
  </div>
</div>
<div class="filter-container">
  <div class="collapsible">
    <input id="collapsible-filter" type="checkbox" name="collapsible">
    <label for="collapsible-filter" id="icon">...et d'autres filtres encore</label>
    <div class="collapsible-body">

      <p>...avec un commentaire ?</p>
      <Slider switchName='notes' --color-checked="hsl(253, 52%, 65%)" bind:checked={notesChecked}/>

      {#if session}
        <p>...sans commentaire ?</p>
        <Slider switchName='no-notes' --color-checked="hsl(253, 52%, 65%)" bind:checked={noNotesChecked}/>
      {/if}

      <p>...par origine (OR)</p>
      <div class="filter-container">
        <CollectionFilter categories={categories} bind:selectedCategories={selectedPlatforms}/>
      </div>

      <p>...par périphérique (JV seulement) (OR)</p>
      <div class="filter-container">
        <CollectionFilter categories={gamePlatforms} bind:selectedCategories={selectedGamePlatforms}/>
      </div>

      <p>...par tags (AND)</p>
      <div class="filter-container">
        <CollectionFilter categories={tags} bind:selectedCategories={selectedTags}/>
      </div>

    </div>
  </div>
</div>

{#key currentPage, paginatedItems}
<div class="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
  {#if filteredCollection.length}
    {#each paginatedItems as item ( item.id )}
      <CultureItemPreview {item} />
    {/each}
  {:else}
      <p>Aucun résultat avec ces critères.</p>
  {/if}
</div>
{/key}

<LightPaginationNav
totalItems="{ filteredCollection.length }"
pageSize="{ pageSize }"
currentPage="{ currentPage }"
limit="{ 1 }"
showStepOptions="{ true }"
on:setPage="{(e) => {
  currentPage = e.detail.page
  }}"
/>

<style lang="scss">
  @use "sass:color";

  $color: hsl(253, 27%, 80%);
  $color-checked: hsl(253, 52%, 65%);

  h1 {
    z-index: 2;
    padding-left: 15px;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 120px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }

  .filter-container {
    p {
      font-size: 0.8em;
      font-style: italic;
    }
  }

  .container {
    gap: 30px;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  h1, .container {
    position: relative;
  }

  .container, #filter-container {
    display: flex;
  }

  .container {
    flex-flow: row wrap;
  }

  .collapsible-body {
    overflow-y: scroll;
  }

  .filter-container > .collapsible > input[id^="collapsible"]:checked ~ div.collapsible-body {
    padding: 0.75em;
    border-left: solid 2px $color-checked;
  }

  .collapsible label {
    font-style: italic;
    text-align: left;
    padding-left: 0;
    font-size: 0.8em;
  }

  .filter {
    display: flex;
    flex-flow: row wrap;
    gap: 15px;
    justify-content: left;
    padding-left: 0;
    &__button {
      padding: 5px 10px;
      background-color: $color;
      border-radius: 15px;
      &:hover {
        background-color: color.scale($color, $lightness: 15%);
        box-shadow: 3px 3px 2px 1px #C3BDD9;
        cursor: pointer;
      }
    }
  }

  .filter input {
    display: none;
  }

  .filter input:checked + label {
    background-color: $color-checked;
    &:hover {
      background-color: $color-checked;
    }
  }

  #icon:after {
    content: "⤵️";
    margin-left: 10px;
  }
</style>