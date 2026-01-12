<script>
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { fade } from "svelte/transition"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import { randomNumber } from "$lib/utils/index.js"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import CollectionFilter from "$lib/components/CollectionFilter.svelte"
  import FormDatalist from "$lib/components/FormDatalist.svelte"

  export let data

  $: ({ listes, listesThemes, itemTypes, session } = data)
  $: selectedThemes = []
  $: selectedTypes = []
  $: filteredLists = filterLists(selectedThemes, selectedTypes, listes)
  $: filterLists = ( themes, types, listes ) => listes.filter(list => {
    if ( themes.length || types.length ) {
      currentPage = 1
      return ( themes.length ? themes.includes(list.theme) : true ) && ( types.length ? types.includes(list.type) : true )
    } else {
      return listes
    }
  })

  $: is_tierlist = false

  // controls the page and items-per-page components
  let currentPage = 1
  let pageSize = 12
  $: paginatedItems = paginate({ items: filteredLists, pageSize, currentPage })

  //find a random ID number and return the associated list
  const randomList = () => {
    const maxID = Math.max(...listes.map(list => list.id))
    const randomID = Math.floor(Math.random() * maxID) + 1
    const selectedList = listes.find(list => list.id === randomID)
    goto(`/listes/${selectedList.slug}`)
  }
</script>

<HeadSEO 
  title="Nico Moisson | Listes"
  description="Des listes à n'en plus finir, des oeuvres à n'en plus vouloir"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>

  <h1>Listes</h1>

  <p>J'adore faire des listes pour tout et n'importe quoi, avec des critères de sélection qui sortent des sentiers battus. Faire un top des jeux comme Zelda, c'est classique, mais faire un top des jeux Nouveau Roman, c'est tout de suite plus curieux. J'avais l'habitude de faire ça sur Sens Critique, surtout pour les jeux, et j'ai continué depuis.</p>
  <p>À côté des listes thématiques de 10 éléments sans classement (📝), il y a aussi des tierlists (🗃️), qui sont ordonnées dans un ordre purement arbitraire et subjectif, est-ce nécessaire de le rappeler.</p>
  <p>Si vous avez des idées de listes sympas, <a href="/contact">n'hésitez pas à me les soumettre.</a></p>

  <button on:click={randomList}>Une liste au hasard !</button>

  {#if session}
  <form method="POST" action="?/insert" use:enhance>

    <FormData query="new_list" query_name="Nouvelle liste"/>
    <FormData query="new_description" query_name="Description"/>
    <FormDatalist query="new_type" query_name="Type" items={itemTypes}/>
    <FormDatalist query="new_theme" query_name="Sujet" items={listesThemes}/>
    <FormData query="new_year" query_name="Année"/>
    <fieldset class="form-group">
      <label for="is_tierlist" class="paper-switch-label">
        Tierlist ?
      </label>
      <label class="paper-switch">
        <input id="is_tierlist" name="is_tierlist" type="checkbox" bind:checked={is_tierlist}/>
        <span class="paper-switch-slider round"></span>
      </label>
  </fieldset>

    <button type="submit">Créer la liste</button>
  </form>
  {/if}

  <div id="container">

    <div class="collapsible">
      <input id="collapsible2" type="checkbox" name="collapsible2">
      <label for="collapsible2" id="icon">Filtrer par type d'oeuvre</label>
      <div class="collapsible-body">
        <CollectionFilter categories={itemTypes} bind:selectedCategories={selectedTypes}/>
      </div>
    </div>

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
    {#if paginatedItems.length}
      {#each paginatedItems as liste ( liste.id )}
      <a href="/listes/{liste.slug}" class="border border-{randomNumber(1, 5)}">{liste.is_tierlist === (true) ? "🗃️" : "📝"} {liste.name}</a>
      {/each}
    {:else}
      <p>Aucune liste ne correspond à ces critères. Essaie avec d'autres options !</p>
    {/if}

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
      width: 100%;
      padding: 15px 15px;
      text-align: center;
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

  @media (min-width: 900px) {
    .flex-lists {
      justify-content: space-evenly;
      a {
        width: 40%;
      }
    }
  }
</style>