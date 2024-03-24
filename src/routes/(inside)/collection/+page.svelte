<script>
  import { fade } from 'svelte/transition'
  import Form from '$lib/components/Form.svelte'
  import ItemFile from '$lib/components/ItemFile.svelte'
  import ItemCard from '$lib/components/ItemCard.svelte'
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  import { supabase } from '@supabase/auth-ui-shared';
  export let data
  export let form
  $: ({ games, categories, status, session } = data)
  let value
  $: filteredGames = games

  let currentPage = 1
  let pageSize = 4
  $: paginatedItems = paginate({ items: filteredGames, pageSize, currentPage })
  
  const multiFilterGames = async () => {
    const platformFilter = document.querySelector('#filter-platform')
    const platformValue = platformFilter.value
    const statusFilter = document.querySelector('#filter-status')
    const statusValue = statusFilter.value
    const searchFilter = document.querySelector('#filter-search')
    const searchValue = searchFilter.value

    if (searchValue !== '') {
      filteredGames = games.filter(game => game.name.toLowerCase().includes(searchValue))
    } else if (platformValue === 'everything') {
      filteredGames = games.filter(game => game.status === statusValue)
    } else {
      filteredGames = games.filter(game => game.platform === platformValue && game.status === statusValue)
    }
    currentPage = 1
    return filteredGames
  }

</script>

<svelte:head>
  <title>Collection - Nicolas Moisson</title>
</svelte:head>

<h1>Collection</h1>

{#if session}
  <div id="collection-form" class="collapsible">
    <input type="checkbox" name="collection-form" id="collapsible1">
    <label for="collapsible1">Ajouter une oeuvre</label>
    <div class="collapsible-body">
      <Form {form} {categories} {status}/>
      <div class="form-image">
        {#if form?.success}
          <img src={form?.gameCoverLink} alt="">
        {/if}
      </div>
    </div>
  </div>
{/if}

<div id="filter-container">
  <label for="filter-platform">Plateforme</label>
  <select name="filter-platform" id="filter-platform">
    <option value="everything" selected>Toutes</option>
    {#each categories as category}
      <option value={category.name}>{category.name}</option>
    {/each}
  </select>

  <label for="filter-status">Status</label>
  <select name="filter-status" id="filter-status">
    {#each status as singleStatus}
      <option value={singleStatus.name}>{singleStatus.converted}</option>
    {/each}
  </select>

  <input type="text" name="filter-search" id="filter-search" placeholder="Chercher un jeu">

  <button type="button" id="filter-sort" on:click={multiFilterGames}>Filtrer</button>

</div>

{#key currentPage}
  <div class="container" id="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#if filteredGames.length > 0}
      {#each paginatedItems as game}
        <ItemCard {game} {session}/>
      {/each}
    {:else}
       <p>Aucun résultat avec ces critères.</p>
    {/if}

  </div>
{/key}

<LightPaginationNav
  totalItems="{filteredGames.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{2}"
  showStepOptions="{true}"
  on:setPage="{(e) => {
    currentPage = e.detail.page
    }}"
/>

<style>

  #collection-form {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: column wrap;
    & img {
      flex-shrink: 0;
    }
  }

  .container {
    display: flex;
    flex-flow: row wrap;
    gap: 50px 20px;
    justify-content: space-around;
  }

  #filter-container {
    margin-bottom: 25px;
  }

  .collapsible-body {
    display: flex;
    flex-flow: row nowrap;
    gap: 50px;
    align-items: top;
  }
</style>