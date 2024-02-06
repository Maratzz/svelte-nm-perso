<script>
  import { enhance } from '$app/forms'
  import toast, { Toaster } from 'svelte-french-toast'
  export let form
  export let categories
  export let status
</script>

<Toaster/>
<form method="POST" action='?/insert' use:enhance={() =>{
  let toastResolve, toastReject

  let toastPromise = new Promise((resolve, reject) => {
    toastResolve = resolve
    toastReject = reject
  })

  toast.promise(toastPromise, {
        loading: 'Saving...',
        success: (e) => `${e}`,
        error: (e) => `${e.message}`,
    })
  return ({result, update}) => {
    if (result.data === 'no game found') {
      toastReject(new Error('Aucun jeu avec ce titre'))
    }
    else if (result.data.formStatus && result.data.formStatus >= 400) {
      toastReject(new Error('Il manque un champ obligatoire !'))
      console.log(result)
    } else {
      toastResolve('OK !')
      update()
    }
  }
}}>

  <label for="game_name">Nom</label>
  <input type="text" name="game_name" id="game_name" value={form?.game ?? ''}>

  <label for="game_developer">Développeuse</label>
  <input type="text" name="game_developer" id="game_developer" value={form?.gameCompany ?? ''}>

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
  <input type="date" name="game_started" id="game_started">

  <label type='date' for="game_finished">Fini le:</label>
  <input type="date" name="game_finished" id="game_finished">

  <label for="game_status">Status</label>
  <input list="game_status" name='game_status'>
  <datalist id="game_status">
    {#each status as state}
      <option value={state.name}></option>
    {/each}
  </datalist>

  <button type="submit" formaction="?/search">IGDB API</button>
  <button type='submit'>Créer la fiche</button>

</form>