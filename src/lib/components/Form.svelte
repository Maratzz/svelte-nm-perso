<script>
  import { enhance } from '$app/forms'
  export let form
  export let categories
  export let status
</script>

<form method="POST" action='?/insert' use:enhance>

  <label for="game_name">Nom</label>
  <input type="text" name="game_name" id="game_name" value={form?.game ?? ''}>

  <label for="game_platform">Plateforme</label>
  <input list="game_platform" name='game_platform'>
  <datalist id="game_platform">
    {#each categories as category}
       <option value={category.name}></option>
    {/each}
  </datalist>

  <label for="game_cover">Image</label>
  <input type="url" name="game_cover" id='game_cover' value={form?.gameCoverLink ?? ''}>

  <label for="game_released_date">Date de sortie</label>
  <input type="date" name="game_released_date" value={form?.gameReleaseDate ?? ''}>

  <label for="game_started">Démarré le:</label>
  <input type="date" name="game_started">

  <label for="game_status">Status</label>
  <input list="game_status" name='game_status'>
  <datalist id="game_status">
    {#each status as state}
      <option value={state.name}></option>
    {/each}
  </datalist>

  <label type='date' for="game_finished">Fini le:</label>
  <input type="date" name="game_finished">

  <button type="submit" formaction="?/search">IGDB API</button>
  <button type='submit'>Créer la fiche</button>

</form>