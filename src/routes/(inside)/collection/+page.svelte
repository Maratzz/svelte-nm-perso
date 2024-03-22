<script>
  import { fade } from 'svelte/transition'
  import Form from '$lib/components/Form.svelte'
  import ItemFile from '$lib/components/ItemFile.svelte'
  export let data
  export let form
  $: ({ games, categories, status, session } = data)
  //$: selected = ''
  let value
  $: filteredGames = games

  const filterGames = async (event) => {
    value = event.currentTarget.value
    //selected = value
    if (value === 'everything') {
      filteredGames = games
    } else {
      filteredGames = games.filter(game => game.platform === value)
    }
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
  <select name="filter-category" id="" on:change={filterGames}>
    <option value="everything" selected>Toutes les plateformes</option>
    {#each categories as category}
        <option value={category.name}>{category.name}</option>
    {/each}
  </select>
</div>

{#key value}
  <div class="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each filteredGames as game}
        <ItemFile {game}/>
    {/each}
  </div>
{/key}

<style>

  #collection-form {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: column wrap;
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