<script>
  import { fade } from "svelte/transition"
  import CollectionFilter from "$lib/components/CollectionFilter.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Form from "$lib/components/Form.svelte"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data
  export let form

  $: ({ collection, categories, status, session, types, supabase } = data)
  $: filteredCollection = collection
  $: filteredPlatforms = []

  //whenever these two change, we update the filteredCollection
  $: selectedCategories = []
  $: selectedPlatforms = []

  // controls the page and items-per-page components
  let currentPage = 1
  let pageSize = 12
  $: paginatedItems = paginate({ items: filteredCollection, pageSize, currentPage })

  let supabaseFilter = async () => {
    let { data, error } = await supabase
    .from("platforms")
    .select("*")
    .overlaps("type", selectedCategories)
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

  $: if (selectedCategories.length) {
    filteredCollection = collection.filter(item => selectedCategories.includes(item.item_type))
    let whatever = supabaseFilter().then((data) => filteredPlatforms = data.array)
    if (selectedPlatforms.length) {
      filteredCollection = filteredCollection.filter(item => selectedPlatforms.includes(item.platform))
      currentPage = 1
    }

    currentPage = 1
  } else {
    filteredCollection = collection
    filteredPlatforms = []
    selectedPlatforms = []
  }

  

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
      <Form {form} {categories} {status} {types}/>
    </div>

  </div>
  {/if}
</div>

<div class="filter-container">
  <p>Filtrer par type</p>
  <CollectionFilter categories={types} bind:selectedCategories/>
</div>

<div class="filter-container">
  <p>Filtrer par plateforme</p>
  <CollectionFilter categories={filteredPlatforms} bind:selectedCategories={selectedPlatforms}/>
</div>


<div id="filter-container">

  <input type="text" name="filter-search" id="filter-search" placeholder="Chercher une oeuvre">

<!--   <div id="filter-container__options">

    <div>
      <label for="filter-type">Type</label>
      <select name="filter-type" id="filter-type">
      <option value="everything" selected>Tous</option>
      {#each types as type }
        <option value={type.name}>{type.name}</option>
      {/each}
      </select>
    </div>

    <div>
      <label for="filter-platform">Plateforme</label>
      <select name="filter-platform" id="filter-platform">
      <option value="everything" selected>Toutes</option>
      {#each categories as category }
        <option value={category.name}>{category.name}</option>
      {/each}
      </select>
    </div>

    <div>
      <label for="filter-status">Status</label>
      <select name="filter-status" id="filter-status">
      <option value="everything" selected>Tous</option>
      {#each status as singleStatus }
        <option value={singleStatus.name}>{singleStatus.converted}</option>
      {/each}
      </select>
    </div>

  </div> -->

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

  #filter-container {
    flex-flow: column nowrap;
    justify-content: flex-start;
    &:has(label) {
      font-size: 0.8rem;
    }
  }

  .collapsible-body {
    overflow-y: scroll;
  }
</style>