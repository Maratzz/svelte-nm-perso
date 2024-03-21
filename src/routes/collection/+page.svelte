<script>
  import { fade } from 'svelte/transition'
  import Form from '$lib/components/Form.svelte'
  import ItemFile from '$lib/components/ItemFile.svelte'
  export let data
  export let form
  $: ({ games, categories, status, session } = data)
  $: selected = ''
  $: filteredGames = games

  const filterGames = async (event) => {
    const value = event.currentTarget.value
    selected = value
    if (selected === 'everything') {
      filteredGames = games
    } else {
      filteredGames = games.filter(game => game.platform === selected)
    }
  }
</script>

<svelte:head>
  <title>Collection - Nicolas Moisson</title>
</svelte:head>

<h1>Collection</h1>

<div id="collection-form" class="container">
  {#if session}
    <Form {form} {categories} {status}/>
  {/if}
</div>

<div id="filter-container">
  <select name="filter-category" id="" on:change={filterGames}>
    <option value="everything" selected>Toutes les plateformes</option>
    {#each categories as category}
        <option value={category.name} selected={category.name}>{category.name}</option>
    {/each}
  </select>
</div>

{#key selected}
  <div class="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each filteredGames as game}
        <ItemFile {game}/>
    {/each}
  </div>
{/key}

<style>
  .container {
    display: flex;
    flex-flow: row wrap;
    gap: 50px 20px;
    justify-content: space-around;
  }

  #filter-container {
    margin-bottom: 25px;
  }

  #collection-form {
    border: 1px solid blue;
  }
</style>