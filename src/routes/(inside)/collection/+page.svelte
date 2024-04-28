<script>
  import { fade } from "svelte/transition"
  import Form from "$lib/components/Form.svelte"
  import ItemCard from "$lib/components/ItemCard.svelte"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import { gsap } from "gsap";

  export let data
  export let form
  $: ({ games, categories, status, session, supabase } = data)
  let value
  $: filteredGames = games

  let currentPage = 1
  let pageSize = 9
  let isEditing = false
  $: paginatedItems = paginate({ items: filteredGames, pageSize, currentPage })
  
  const multiFilterGames = async () => {
    const platformFilter = document.querySelector("#filter-platform")
    const platformValue = platformFilter.value
    const statusFilter = document.querySelector("#filter-status")
    const statusValue = statusFilter.value
    const searchFilter = document.querySelector("#filter-search")
    const searchValue = searchFilter.value

    filteredGames = games.filter(
      game => game.name.toLowerCase().includes( searchValue )
      && (platformValue === "everything" ? game.platform !== null : game.platform === platformValue)
      && (statusValue === "everything" ? game.status !== null : game.status === statusValue))
    currentPage = 1
    return filteredGames
  }  

  let editGame = async ( game ) => {
    const updatedForm = document.querySelector( "#updatedForm" )
    let updateGameNote = document.querySelector( "#updated_notes" )
    let updateGameStatus = document.querySelector( "#updated_status" )
    let updateGameStarted = document.querySelector( "#updated_started" )
    let updateGameFinished = document.querySelector( "#updated_finished" )
    let updatedID = document.querySelector( "#updated_id" )

    updateGameNote.textContent = game.notes
    updateGameStatus.value = game.status
    updateGameStarted.value = game.started_at
    updateGameFinished.value = game.finished_at
    updatedID.value = game.id

    gsap.to( updatedForm, { display: "block", x: 20, duration: 0.3 })
  }

  let displayCollectionForm = async () => {
    let collectionForm = document.querySelector("#collection-form")
    collectionForm.style.display = "block"
  }

</script>

<HeadSEO 
  title="Nico Moisson | Collection"
  description="Des oeuvres à n'en plus finir, des listes à n'en plus vouloir"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<h1>Collection</h1>

{#if session }
  <button on:click={displayCollectionForm}>Ajouter une oeuvre</button>
  <div id="collection-form">
    <Form {form} {categories} {status}/>
    <div class="form-image">
      {#if form?.success}
      <img src={form?.gameCoverLink} alt="">
      {/if}
    </div>
  </div>
{/if}

<div id="filter-container">

  <div id="filter-platform-wrap">

    <label for="filter-platform">Plateforme</label>
    <select name="filter-platform" id="filter-platform">
    <option value="everything" selected>Toutes</option>
    {#each categories as category }
      <option value={category.name}>{category.name}</option>
    {/each}
    </select>

  </div>

  <div id="filter-status-wrap">

    <label for="filter-status">Status</label>
    <select name="filter-status" id="filter-status">
    <option value="everything" selected>Tous</option>
    {#each status as singleStatus }
      <option value={singleStatus.name}>{singleStatus.converted}</option>
    {/each}
    </select>

  </div>

  <div id="filter-search-wrap">

    <input type="text" name="filter-search" id="filter-search" placeholder="Chercher un jeu">
    <button type="button" id="filter-sort" on:click={multiFilterGames}>Filtrer</button>

  </div>

</div>

{#key currentPage, paginatedItems }
  <div id="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#if filteredGames.length > 0 }
      {#each paginatedItems as game ( game.id )}
        <ItemCard {game} {session} {supabase} onEdit={() => editGame( game )}/>
      {/each}
    {:else}
       <p>Aucun résultat avec ces critères.</p>
    {/if}
  
    {#if session }
    <div id="updatedForm" class="border border-3">
      <form method="POST" id="updated_form" action="?/update">

        <label for="updated_id">ID</label>
        <input type="text" name="updated_id" id="updated_id">
      
        <label for="updated_status">Status</label>
        <input type="text" name="updated_status" id="updated_status">

        <label type="date" for="updated_started">Démarré le:</label>
        <input type="date" name="updated_started" id="updated_started">
      
        <label type="date" for="updated_finished">Terminé le:</label>
        <input type="date" name="updated_finished" id="updated_finished">
      
        <label for="updated_notes">Notes</label>
        <textarea name="updated_notes" id="updated_notes"></textarea>
      
        <button type="submit">Mettre à jour</button>
      
      </form>
    </div>
    {/if}
  </div>
{/key}

<LightPaginationNav
  totalItems="{ filteredGames.length }"
  pageSize="{ pageSize }"
  currentPage="{ currentPage }"
  limit="{ 2 }"
  showStepOptions="{ true }"
  on:setPage="{(e) => {
    currentPage = e.detail.page
    }}"
/>

<style lang="scss">
  #collection-form {
    display: none;
    border: solid 3px red;
  }

  #container {
    border: 3px solid green;
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    gap: 30px;
    justify-content: center;
  }
</style>