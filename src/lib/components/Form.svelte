<script>
  import { enhance } from "$app/forms"
  import toast, { Toaster } from "svelte-french-toast"

  export let form
  export let categories
  export let status
</script>

<Toaster/>

<form method="POST" action="?/insert" use:enhance={() => {
  /* let toastResolve, toastReject
  let toastPromise = new Promise(( resolve, reject ) => {
    toastResolve = resolve
    toastReject = reject
  })
  toast.promise(toastPromise, {
    loading: "Saving...",
    success: (e) => `${e}`,
    error: (e) => `${e.message}`,
  }) */

  return ({ result, update }) => {
    if ( result.data === "no game found" ) {
      /* toastReject(new Error( "Aucun jeu avec ce titre" )) */
      toast.error("aucun jeu avec ce titre frère", {
        style: "margin-top: 80px;"
      })
    }
    else if ( result.data.formStatus && result.data.formStatus >= 400 ) {
      /* toastReject(new Error( "Il manque un champ obligatoire !" )) */
      toast.error("il manque un champ", {
        style: "margin-top: 80px;"
      })
      console.log( result )
    } else {
      /* toastResolve("OK !") */
      toast.success("okay, tout bon !", {
        style: "margin-top: 80px;"
      })
      update()
    }
  }
}}>

  <div class="form-inside-name">

    <div>
      <label for="game_name">Nom</label>
      <input type="text" name="game_name" id="game_name" value={form?.game ?? ""} size="13">
    </div>

    <button type="submit" formaction="?/search">IGDB API</button>

  </div>

  <div class="form-inside-calendar">

    <div>
      <label for="game_started">Démarré le:</label>
      <input type="date" name="game_started" id="game_started">
    </div>

    <div>
      <label type="date" for="game_finished">Fini le:</label>
      <input type="date" name="game_finished" id="game_finished">
    </div>

  </div>

  <div class="form-inside-input">

    <div>
      <label for="game_platform">Plateforme</label>
      <input list="game_platform" name="game_platform" size="13">
      <datalist id="game_platform">
        {#each categories as category}
        <option value={category.name}></option>
        {/each}
      </datalist>
    </div>

    <div>
      <label for="game_status">Status</label>
      <input list="game_status" name="game_status" size="13">
      <datalist id="game_status">
        {#each status as state}
          <option value={state.name}></option>
        {/each}
      </datalist>
    </div>

  </div>

  <div class="form-inside-notes">
    <label for="game_notes">Notes</label>
    <textarea name="game_notes" id="game_notes" placeholder="Something to say?"></textarea>
  </div>


  <div>
    <div class="collapsible">
      <input type="checkbox" id="collapsible2" name="collapsible2">
      <label for="collapsible2">IGDB info</label>
      <div class="collapsible-body">
        <label for="game_developer">Développeuse</label>
        <input type="text" name="game_developer" id="game_developer" value={form?.gameCompany ?? ""}>
    
        <label for="game_cover">Image</label>
        <input type="url" name="game_cover" id="game_cover" value={form?.gameCoverLink ?? ""}>
    
        <label for="game_released_date">Date de sortie</label>
        <input type="date" name="game_released_date" value={form?.gameReleaseDate ?? ""}>
      </div>
    </div>
  </div>

  <button type="submit" id="button-submit">Créer la fiche</button>

</form>

<style lang="scss">

  form {
    padding: 10px 5px 10px 5px;
    :has(label) {
      font-size: 0.8rem;
      font-style: italic;
    }
  }

  .form-inside-name, .form-inside-calendar, .form-inside-input {
    display: flex;
    flex-flow: row wrap;
  }

  .form-inside-name, .form-inside-calendar, .form-inside-input, .form-inside-notes {
    padding-top: 10px;
  }

  #button-submit {
    margin-left: 5px;
  }

  .form-inside-calendar, .form-inside-input {
    margin-top: 15px;
  }
  .form-inside-input {
    margin-bottom: 15px;
  }

  .form-inside-name button {
    margin: 15px 0px 0px 15px;
  }
</style>