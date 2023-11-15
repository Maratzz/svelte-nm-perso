<script>
  import { enhance } from '$app/forms'
  export let form
  export let categories
  export let status
</script>

<form method="POST" use:enhance>

  <label for="new-game">Nom</label>
  <input type="text" name="new-game" id="" value={form?.game ?? ''}>

  <button type="submit" formaction="?/search">IGDB API</button>

  <label for="platforms">Plateforme</label>
  <input list="platforms" name='new-platform'>
  <datalist id="platforms">
    {#each categories as category}
       <option value={category.name}></option>
    {/each}
  </datalist>

  <label for="cover">Image</label>
  <input type="url" name="cover" value={form?.gameCoverLink ?? ''}>

  <label for="released_date">Date de sortie</label>
  <input type="date" name="released_date" value={form?.gameReleaseDate ?? ''}>

  <label for="game_started">Démarré le:</label>
  <input type="date" name="game_started">

  <label for="new-status">Status</label>
  <input list="new-status" name='new-status'>
  <datalist id="new-status">
    {#each status as state}
      <option value={state.name}></option>
    {/each}
  </datalist>

  <label type='date' for="game_finished">Fini le:</label>
  <input type="date" name="game_finished">

  <button type='submit'>Créer la fiche</button>

</form>