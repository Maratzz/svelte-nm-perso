<script>
  import Form from '$lib/components/Form.svelte'
  export let data
  $: ({ games } = data)
  console.log(data)
</script>

<svelte:head>
  <title>Collection - Nicolas Moisson</title>
</svelte:head>

<h1>Collection</h1>

<Form/>

{#each games as game}
   <div>
      <h2>{game.name}</h2>
      <p>{game.platform}, {new Date(`${game.released_in}`).getFullYear()}</p>
      <p>Développé par {#each game.developers as developer}{developer}{/each} et édité par {game.publisher}</p>
      <img src={game.cover} alt='Jaquette du jeu {game.name}'>

      {#if game.currently_doing}
        <p>
          En cours depuis le {new Date(`${game.started_at}`).toLocaleDateString()}</p>
      {:else}
        <p>
          Démarré le {new Date(`${game.started_at}`).toLocaleDateString()} et terminé le {new Date(`${game.finished_at}`).toLocaleDateString()}
        </p>
      {/if}
   </div>
{/each}

