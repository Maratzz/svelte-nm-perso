<script>
  export let data

  let { games } = data
  console.log(data)
  
</script>

<h1>test twitch api</h1>

{#each games as game}
   <h2>{game.name}</h2>
   <p>{game.summary ?? 'aucun resume'}</p>
{/each}