<script>
  export let data

  let { listes } = data
  console.log(listes)
</script>

<div>

  <h1>Listes</h1>
  
  <div>
    {#each listes as liste}
      <p>{liste.id}: {liste.name}</p>
      <p class="info-small">{liste.description}</p>
      <ul>
        {#each liste.games as game}
        <li>{game.name}</li>
        {/each}
      </ul>

    {/each}
  </div>

</div>

<style>
  .info-small {
    font-size: 0.8em;
  }
</style>