<script>
  import { fade } from "svelte/transition"
  import Item from "$lib/components/Item.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Form from "$lib/components/Form.svelte"
  import { paginate, LightPaginationNav } from "svelte-paginate"
  import { onMount } from "svelte"

  export let data
  export let form

  $: ({ games, categories, status, session, supabase } = data)
  $: itemDetails = []
  $: innerList = []
  $: filteredGames = games

  let currentPage = 1
  let pageSize = 12
  let itemOpened = false
  let isEditing = false

  $: paginatedItems = paginate({ items: filteredGames, pageSize, currentPage })

  const multiFilterGames = () => {
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

  let formatDateYear = ( e ) => { 
    return new Date(e).getFullYear()
  }

  let formatDate = ( e ) => { 
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    return new Date(e).toLocaleDateString( "fr", options )
  }

  let getInfo = async ( game ) => {
    let { data: item } = await supabase
      .from('games')
      .select('*')
      .eq('id', game.id)

    itemDetails = item[0]
    innerList = await getLists(game)
    itemOpened = !itemOpened
  }

  let getLists = async ( e ) => {
    let { data: lists } = await supabase
      .from("games")
      .select(`
        name,
        lists (
          name
        )
      `)
      .eq("name", `${e.name}`)
      .order("name", {ascending: true})
    let itemLists = lists[0].lists
    let innerList = []
    itemLists.forEach(list => 
      innerList.push( list.name )
    )
    return innerList
  }
  
  let closeItem = () => {
    itemOpened = !itemOpened
  }

  let displayCollectionForm = () => {
    let collectionForm = document.querySelector(".collection-form")
    collectionForm.classList.toggle('opened')
  }

  let editItem = () => {
    let updatedForm = document.querySelector( ".updatedForm" )
    let updateGameNote = document.querySelector( "#updated_notes" )
    let updateGameStatus = document.querySelector( "#updated_status" )
    let updateGameStarted = document.querySelector( "#updated_started" )
    let updateGameFinished = document.querySelector( "#updated_finished" )
    let updatedID = document.querySelector( "#updated_id" )

    updateGameNote.textContent = itemDetails.notes
    updateGameStatus.value = itemDetails.status
    updateGameStarted.value = itemDetails.date_started
    updateGameFinished.value = itemDetails.date_finished
    updatedID.value = itemDetails.id

    updatedForm.classList.toggle("opened")
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
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>


<h1>Collection</h1>

{#if session }
<button on:click={displayCollectionForm} id="button-add">Ajouter une oeuvre</button>
<div class="collection-form">
  <Form {form} {categories} {status}/>
  <div class="form-image">
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
  {#if filteredGames.length}
    {#each paginatedItems as game ( game.id )}
      <Item {game} getInfo={() => {getInfo( game )}}/>
    {/each}
  {:else}
      <p>Aucun résultat avec ces critères.</p>
  {/if}
</div>
{/key}


{#key itemDetails, innerList}
<div class={itemOpened ? "border border-5 item-opened opened" : "item-opened"}>

  <button on:click={closeItem} id="button-close">Fermer</button>

  {#if session}
    <button on:click={editItem} id="button-edit">Edit</button>

    <div class="border border-3 updatedForm">
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

  <div id="item-opened__info">

    <img src={itemDetails.cover} alt="Jaquette du jeu {itemDetails.name}" id="info__img">

    <div id="info__inner">
      <p class="info-big"><b>{itemDetails.name}</b></p>
      <p class="info-small"><i>{itemDetails.developers}, {formatDateYear(itemDetails.date_released)}</i></p>

      <p class="info-small">Status: 
        {#if itemDetails.status === "finished"}
          terminé
        {:else if  itemDetails.status === "flushed"}
          abandonné
        {:else if itemDetails.status === "backlog"}
          dans le backlog depuis le {formatDate(itemDetails.date_acquired)}
        {:else if itemDetails.status === "currently playing"}
          en cours
        {:else if itemDetails.status === "wishlist"}
          dans les envies
        {/if}
      </p>
      {#if itemDetails.status === "finished" && itemDetails.date_finished !== null}
      <p class="info-small">Terminé le {formatDate(itemDetails.date_finished)}</p>
      {:else if  itemDetails.status === "currently playing"}
      <p class="info-small">En cours depuis le {formatDate(itemDetails.date_started)}</p>
      {:else if itemDetails.status === "flushed" && itemDetails.date_finished !== null}
      <p class="info-small">Abandonné le {formatDate(itemDetails.date_finished)}</p>
      {/if}
    </div>

  </div>

  <div id="item-opened__notes">
    {itemDetails.notes}
  </div>

  {#if innerList.length}
  <div id="item-opened__lists">
    <p>Ce jeu est dans {innerList.length === 1 ? "la liste suivante" : "les listes suivantes"}:</p>
    <ul>
      {#each innerList as list}
      <li>{list}</li>
      {/each}
    </ul>
  </div>
  {:else}
  <div id="item-opened__lists">
    <p>Ce jeu n'est dans aucune liste, pour le moment</p>
  </div>
  {/if}

</div>
{/key}

<LightPaginationNav
totalItems="{ filteredGames.length }"
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

  .collection-form {
    display: none;
    z-index: 2;
    background-color: white;
  }

  #button-add {
    margin-left: 15px;
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

  .item-opened {
    display: none;
    position: fixed;
    width: 95%;
    height: 85vh;
    overflow: auto;
    top: 100px;
    left: 10px;
    z-index: 15;
    background-color: #eee;
  }

  .updatedForm {
    display: none;
    background-color: rgb(250, 252, 179);
    position: absolute;
    top: 50px;
    left: 20px;
    width: 80vw;
    margin: 0 auto;
    padding: 15px 20px;
  }

  #button {
    &-close, &-edit {
      position: fixed;
    }
    &-close {
      bottom: -10px;
      right: 25px;
    }

    &-edit {
      bottom: -10px;
      left: 25px;
    }
  }

  #item-opened {
    &__info {
      display: flex;
      flex-flow: row nowrap;
      margin: 25px 10px 10px 10px;
      gap: 15px;
    }
    &__notes {
      padding: 25px 10px 0 10px;
    }
    &__lists {
      padding: 25px 10px 50px 10px;
    }
  }

  #info__inner {
    p:not(:last-child) {
      margin: 0;
    }
  }

  #info__img {
    width: 30vw;
    height: 100%;
  }

  .info {
    &-big {
      font-size: 1.5em;
      margin: 0 0 10px 0;
    }
    &-small {
      font-size: 0.8em;
    }
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

  .opened {
    display: block;
  }

  @media (min-width: 900px) {

    .item-opened {
      width: 65vw;
      position: fixed;
      left: 18%;
    }

    .updatedForm {
      width: 40vw;
    }

    #info__img {
      width: 15vw;
    }

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

    #button {
      &-close {
        position: absolute;
        bottom: 75vh;
        right: 25px;
        z-index: 5;
      }
      &-edit {
        position: absolute;
        bottom: 66vh;
        left: 55vw;
      }
    }
  }
</style>