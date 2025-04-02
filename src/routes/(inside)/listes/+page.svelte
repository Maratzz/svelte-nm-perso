<script>
  import { enhance } from '$app/forms'
  import { fade } from "svelte/transition"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import { randomNumber } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import CollectionFilter from '$lib/components/CollectionFilter.svelte'

  export let data

  $: ({ listes, listesThemes, session } = data)
  $: selectedThemes = []
  $: filteredLists = filterLists(selectedThemes, listes)
  $: filterLists = ( themes, listes ) => listes.filter(list => {
    if ( themes.length ) {
      currentPage = 1
      return ( themes.length ? themes.includes(list.theme) : true )
    } else {
      return listes
    }
  })

  // controls the page and items-per-page components
  let currentPage = 1
  let pageSize = 12
  $: paginatedItems = paginate({ items: filteredLists, pageSize, currentPage })
</script>

<HeadSEO 
  title="Nico Moisson | Listes"
  description="Des listes à n'en plus finir, des oeuvres à n'en plus vouloir"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
/>

<div>

  <h1>Listes</h1>

  <p>L'algorithme de découverte Netflix ou Steam vous renvoie toujours les mêmes oeuvres et ça vous lasse ? Plutôt que de piocher dans un top 10 quelconque vous aimeriez découvrir selon des thèmes originaux, loufoques ou peu explorés ? Ça tombe bien, j'adore faire des listes pour tout et n'importe quoi. Dedans, 5 titres au maximum, sans classement, et la garantie d'une sélection à la main, sans algorithme ni publicité mensongère. Et si vous avez des idées de listes sympas, <a href="/contact">n'hésitez pas à me les soumettre.</a></p>

  {#if session}
  <form method="POST" action="?/insert" use:enhance>

    <FormData query="new_list" query_name="Nouvelle liste" placeholder="Comment s'appelle-t-elle ?"/>

    <FormData query="new_description" query_name="Description" placeholder="une liste pour quoi ?"/>

    <button type="submit">Créer la liste</button>
  </form>
  {/if}

  <div id="container">

    <div class="collapsible">
      <input id="collapsible" type="checkbox" name="collapsible">
      <label for="collapsible" id="icon">Filtrer par sujet</label>
      <div class="collapsible-body">
        <CollectionFilter categories={listesThemes} bind:selectedCategories={selectedThemes}/>
      </div>
    </div>
    
  </div>

  {#key currentPage, paginatedItems}
  <div class="flex-lists" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each paginatedItems as liste ( liste.id )}
    <a href="/listes/{liste.slug}" class="border border-{randomNumber(1, 5)}">{liste.name}</a>
    {/each}
  </div>
  {/key}

  <LightPaginationNav
    totalItems="{ filteredLists.length }"
    pageSize="{ pageSize }"
    currentPage="{ currentPage }"
    limit="{ 1 }"
    showStepOptions="{ true }"
    on:setPage="{(e) => {
      currentPage = e.detail.page
    }}"
  />

</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 70px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }
  #container {
    height: 100%;
    margin-bottom: 50px;
  }

  .flex-lists {
    display: flex;
    flex-flow: row wrap;
    gap: 15px;
    margin-top: 15px;
    margin-bottom: 45px;
    a {
      display: block;
      height: max-content;
      background-color: #fff;
      width: 40%;
      padding: 15px 15px;
    }
  }

  .collapsible label {
    font-style: italic;
    text-align: left;
    padding-left: 0;
    font-size: 0.8em;
  }

  #icon:after {
    content: "⤵️";
    margin-left: 10px;
  }
</style>