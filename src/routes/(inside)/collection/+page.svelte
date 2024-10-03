<script>
  import { fade } from "svelte/transition"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Form from "$lib/components/Form.svelte"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import { onMount } from "svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data
  export let form

  $: ({ collection, categories, status, session, types } = data)
  $: filteredCollection = collection

  let currentPage = 1
  let pageSize = 12

  $: paginatedItems = paginate({ items: filteredCollection, pageSize, currentPage })

  const multiFilterGames = () => {
    const platformFilter = document.querySelector("#filter-platform")
    const platformValue = platformFilter.value
    const statusFilter = document.querySelector("#filter-status")
    const statusValue = statusFilter.value
    const searchFilter = document.querySelector("#filter-search")
    const searchValue = searchFilter.value

    filteredCollection = collection.filter(
      item => item.name.toLowerCase().includes( searchValue )
      && (platformValue === "everything" ? item.platform !== null : item.platform === platformValue)
      && (statusValue === "everything" ? item.status !== null : item.status === statusValue))
    currentPage = 1
    return filteredCollection
  }

  onMount(() => {

    let filterButton = document.querySelector("#filter-search")
    filterButton.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
      event.preventDefault()
      multiFilterGames()
      }
    })

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


<h1>Collection</h1>

{#if session}
<div class="collapsible">
  <input type="checkbox" id="collapsible2" name="collapsible2">
  <label for="collapsible2">Créer une oeuvre</label>
  <div class="collapsible-body">
    <Form {form} {categories} {status} {types}/>
    {#if form?.success}
    <img src={form?.gameCoverLink} alt="">
    {/if}
  </div>
</div>
{/if}

<div id="filter-container">

  <div id="filter-wrap-options">

    <div id="filter-wrap-platform">

      <label for="filter-platform">Plateforme</label>
      <select name="filter-platform" id="filter-platform">
      <option value="everything" selected>Toutes</option>
      {#each categories as category }
        <option value={category.name}>{category.name}</option>
      {/each}
      </select>
  
    </div>
  
    <div id="filter-wrap-status">
  
      <label for="filter-status">Status</label>
      <select name="filter-status" id="filter-status">
      <option value="everything" selected>Tous</option>
      {#each status as singleStatus }
        <option value={singleStatus.name}>{singleStatus.converted}</option>
      {/each}
      </select>
  
    </div>
  </div>

  <div id="filter-wrap-search">

    <input type="text" name="filter-search" id="filter-search" placeholder="Chercher un jeu">
    <button type="button" id="filter-button" on:click={multiFilterGames}>Filtrer</button>

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
  h1 {
    position: relative;
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

  .container {
    display: flex;
    position: relative;
    flex-flow: row wrap;
    gap: 30px;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  #filter {
    &-container {
      margin-bottom: 25px;
      &:has(label) {
        font-size: 0.8rem;
      }
    }
    &-wrap-options {
      display: flex;
      flex-flow: row nowrap;
      gap: 15px;
    }
    &-wrap-search {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-wrap-options, &-wrap-search {
      margin-left: 15px;
      max-width: fit-content;
    }
    &-search {
      height: 50px;
    }

    &-button {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  @media (min-width: 900px) {

    #filter-container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      gap: 30px;
      align-items: flex-end;
    }

    #filter-wrap-search {
      align-items: flex-end;
      gap: 15px;
    }
  }
</style>