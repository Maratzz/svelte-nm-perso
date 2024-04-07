<script>
  import { fade } from 'svelte/transition'
  import Form from '$lib/components/Form.svelte'
  import ItemCard from '$lib/components/ItemCard.svelte'
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  import { supabase } from '@supabase/auth-ui-shared';
  export let data
  export let form
  $: ({ games, categories, status, session } = data)
  let value
  $: filteredGames = games

  let currentPage = 1
  let pageSize = 9
  $: paginatedItems = paginate({ items: filteredGames, pageSize, currentPage })
  
  const multiFilterGames = async () => {
    const platformFilter = document.querySelector('#filter-platform')
    const platformValue = platformFilter.value
    const statusFilter = document.querySelector('#filter-status')
    const statusValue = statusFilter.value
    const searchFilter = document.querySelector('#filter-search')
    const searchValue = searchFilter.value

    filteredGames = games.filter(game => game.name.toLowerCase().includes(searchValue) && (platformValue === 'everything' ? game.platform !== null : game.platform === platformValue) && (statusValue === 'everything' ? game.status !== null : game.status === statusValue))
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
  <div id="filter-platform-wrap">
    <label for="filter-platform">Plateforme</label>
    <select name="filter-platform" id="filter-platform">
    <option value="everything" selected>Toutes</option>
    {#each categories as category}
      <option value={category.name}>{category.name}</option>
    {/each}
    </select>
  </div>

  <div id="filter-status-wrap">
    <label for="filter-status">Status</label>
    <select name="filter-status" id="filter-status">
    <option value="everything" selected>Tous</option>
    {#each status as singleStatus}
      <option value={singleStatus.name}>{singleStatus.converted}</option>
    {/each}
    </select>
  </div>

  <div id="filter-search-wrap">
    <input type="text" name="filter-search" id="filter-search" placeholder="Chercher un jeu">
    <button type="button" id="filter-sort" on:click={multiFilterGames}>Filtrer</button>
  </div>

</div>

{#key currentPage, paginatedItems}
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
    gap: 50px 50px;
    margin-bottom: 50px;
  }

  #filter-container {
    margin-bottom: 25px;
    display: flex;
    flex-flow: column wrap;
    gap: 10px;
  }

  .collapsible-body {
    display: flex;
    flex-flow: row nowrap;
    gap: 50px;
    align-items: top;
  }
</style>