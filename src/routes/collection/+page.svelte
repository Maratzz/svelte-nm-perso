<script>
  import { fade } from 'svelte/transition'
  import Form from '$lib/components/Form.svelte'
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

<div>
  {#if session}
    <p>TODO: create and place item form to add directly in client instead of using supabase dashboard. We need to validate the form first, stop it from submitting if fields are empty or error, then send it and trigger a page reload to refresh games in data.</p>

    <p>TODO: fetch twitch api with a name and return a list of names, upon clicking on one of them it should fill all the other fields so</p>

    {#if form?.success}
      <img src={form.gameCoverLink} alt='Jaquette du jeu {form.game}'>
    {/if}

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
        <div class="item">
          <img src={game.cover} alt='Jaquette du jeu {game.name}'>
        </div>
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
</style>