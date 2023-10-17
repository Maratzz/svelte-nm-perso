<script>
  export let data
  const { games } = data
  console.log(data)
</script>

<h1>test twitch api</h1>

{#each games as game}
  <p>{game.name}</p>
  <p>{game.summary}</p>
   
{/each}

