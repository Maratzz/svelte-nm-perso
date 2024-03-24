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

  const filterGames = async (event) => {
    value = event.currentTarget.value
    if (value === 'everything') {
      paginatedItems = paginate({ items: games, pageSize, currentPage })
      filteredGames = games
    } else {
      filteredGames = games.filter(game => game.platform === value)
      paginatedItems = paginate({ items: filteredGames, pageSize, currentPage})
    }
  }
  
  
  const multiFilterGames = async () => {
    const platformFilter = document.querySelector('#filter-platform')
    const platformValue = platformFilter.value
    const statusFilter = document.querySelector('#filter-status')
    const statusValue = statusFilter.value

    filteredGames = games.filter(game => game.platform === platformValue && game.status ===statusValue)

    console.log(filteredGames)

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


<!-- <div id="filter-container">
  <select name="filter-category" id="" on:change={filterGames}>
    <option value="everything" selected>Toutes les plateformes</option>
    {#each categories as category}
        <option value={category.name}>{category.name}</option>
    {/each}
  </select>
</div> -->

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

  <button type="button" id="filter-sort" on:click={multiFilterGames}>Filtrer</button>

</div>

{#key value}
  <div class="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each paginatedItems as game}
        <ItemCard {game} {session}/>
    {/each}
  </div>
{/key}

<LightPaginationNav
  totalItems="{filteredGames.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{3}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
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