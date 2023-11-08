<script>
  export let categories
  export let newGameName
  export let newGamePlatform
  export let newGameStatus
  export let gameStatus
  export let newGameCover
</script>

<form method="POST">

  <label for="new-item">Nom</label>
  <input 
    type="text"
    name="new-item"
    id=""
    required
    bind:value={newGameName}>

  <label for="platforms">Plateforme</label>
  <input list="platforms" bind:value={newGamePlatform} required>
  <datalist id="platforms">
    {#each categories as category}
      <option value={category}></option>
    {/each}
  </datalist>

  <label for="status">Status</label>
  <input list="status" bind:value={newGameStatus} required>
  <datalist id="status">
    {#each gameStatus as status}
      <option value={status}></option>
    {/each}
  </datalist>

  <label for="cover">Image</label>
  <input type="url" name="cover" bind:value={newGameCover} required>

  <label for="released_in">Date de sortie</label>
  <input type="date" name="released_in" id="" required>
  <!-- TODO set up datepicker ? -->

  <label for="started_at">Démarré le:</label>
  <input type="date" name="started_at" id="" required>
  <!-- TODO set up datepicker ? -->

  <label type='date' for="finished_at">Fini le:</label>
  <!-- TODO set up datepicker ? -->

  <input type="submit" value="Créer la fiche">

</form>