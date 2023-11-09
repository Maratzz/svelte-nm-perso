<script>
  import { enhance } from '$app/forms'
  export let categories
  export let status
</script>

<form method="POST" use:enhance>

  <label for="new-game">Nom</label>
  <input type="text" name="new-game" id="">

  <label for="platforms">Plateforme</label>
  <input list="platforms" name='new-platform'>
  <datalist id="platforms">
    {#each categories as category}
      <option value={category.name}></option>
    {/each}
  </datalist>

  <label for="new-status">Status</label>
  <input list="new-status" name='new-status'>
  <datalist id="new-status">
    {#each status as state}
      <option value={state.name}></option>
    {/each}
  </datalist>

  <!-- <label for="cover">Image</label>
  <input type="url" name="cover"> -->

  <!-- <label for="released_in">Date de sortie</label>
  <input type="date" name="released_in"> -->
  <!-- TODO set up datepicker ? -->

  <!-- <label for="started_at">Démarré le:</label>
  <input type="date" name="started_at"> -->
  <!-- TODO set up datepicker ? -->

  <!-- <label type='date' for="finished_at">Fini le:</label> -->
  <!-- TODO set up datepicker ? -->

  <button type='submit'>Create</button>

</form>