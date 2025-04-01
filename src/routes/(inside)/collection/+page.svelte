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

  $: ({ collection, categories, status, session, types, supabase } = data)
  $: filteredCollection = filteredData(selectedCategories, selectedPlatforms, selectedStatus, checked, collection)
  $: filteredPlatforms = selectedCategories.length ? supabaseFilter(supabase, selectedCategories).then((data) => filteredPlatforms = data.array) : []

  //whenever these arrays change, we update the filteredCollection
  $: selectedCategories = []
  $: selectedStatus = []
  $: selectedPlatforms = []

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

  $: filteredData = (categories, platforms, status, checked, collection) => collection.filter(item => {
      if ( categories.length || platforms.length || status.length || checked === true ) {
        currentPage = 1
        return (categories.length ? categories.includes(item.item_type) : true) && (platforms.length ? platforms.includes(item.platform) : true) && (status.length ? status.includes(item.status) : true) && (checked === true ? item.notes !== (null || "") : true)
      } else {
        return collection
      }
    })

  $: checked = false
  let handleSwitch = () => console.log("checkvalue:", checked)
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
  <p>...par statut</p>
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
      <Slider switchName='notes' --color-checked="hsl(253, 52%, 65%)" bind:checked {handleSwitch}/>
      <p>...par origine</p>
      <div class="filter-container">
        <CollectionFilter categories={categories} bind:selectedCategories={selectedPlatforms}/>
      </div>
    </div>
  </div>
</div>

<div id="filter-container">
  <input type="text" name="filter-search" id="filter-search" placeholder="Chercher une oeuvre">
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

  .collapsible > input[id^="collapsible"]:checked ~ div.collapsible-body {
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

  input {
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