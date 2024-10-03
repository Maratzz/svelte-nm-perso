<script>
  import { enhance } from "$app/forms"
  import toast, { Toaster } from "svelte-french-toast"

  export let form
  export let categories
  export let status
  export let types
</script>

<Toaster/>

<form method="POST" action="?/insert" use:enhance={() => {

  return ({ result, update }) => {
    if ( result.data === "no game found" ) {
      toast.error("aucun jeu avec ce titre frère", {
        style: "margin-top: 80px;"
      })
    } else if ( result.data === undefined ) {
      toast.error("data manquante sur la fiche", {
        style: "margin-top: 80px;"
      })
    } else if ( result.data.supabaseResponse?.error?.code === "23503" ) {
      toast.error("il manque un champ", {
        style: "margin-top: 80px;"
      })
    } else if ( result.data.supabaseResponse?.error?.code === "23505" ) {
      toast.error("ce jeu est déjà dans la collection", {
        style: "margin-top: 80px;"
      })
    } else {
      toast.success("okay, tout bon !", {
        style: "margin-top: 80px;"
      })
      update()
    }
  }
}}>

  <div class="form-inside-name">

    <div>
      <label for="item_name">Nom</label>
      <input type="text" name="item_name" id="item_name" value={form?.game ?? ""} size="13">
    </div>

    <button type="submit" formaction="?/search">IGDB API</button>

  </div>

  <div class="form-inside-acquired">

    <label for="item_acquired">Acquis le:</label>
    <input type="date" name="item_acquired" id="item_acquired">

  </div>

  <div class="form-inside-calendar">

    <div>
      <label for="item_started">Démarré le:</label>
      <input type="date" name="item_started" id="item_started">
    </div>

    <div>
      <label type="date" for="item_finished">Fini le:</label>
      <input type="date" name="item_finished" id="item_finished">
    </div>

  </div>

  <div class="form-inside-input">

    <div>
      <label for="item_type">Type</label>
      <input list="item_type" name="item_type" size="13">
      <datalist id="item_type">
        {#each types as type}
        <option value={type.name}></option>
        {/each}
      </datalist>
    </div>

    <div>
      <label for="item_platform">Plateforme</label>
      <input list="item_platform" name="item_platform" size="13">
      <datalist id="item_platform">
        {#each categories as category}
        <option value={category.name}></option>
        {/each}
      </datalist>
    </div>

    <div>
      <label for="item_status">Status</label>
      <input list="item_status" name="item_status" size="13">
      <datalist id="item_status">
        {#each status as state}
          <option value={state.name}></option>
        {/each}
      </datalist>
    </div>

  </div>

  <div class="form-inside-notes">
    <label for="item_notes">Notes</label>
    <textarea name="item_notes" id="item_notes" placeholder="Something to say?"></textarea>
  </div>


  <div>
    <label for="game_developer">Autrices</label>
    <input type="text" name="game_developer" id="game_developer" value={form?.gameCompany ?? ""}>

    <label for="game_cover">Image</label>
    <input type="url" name="game_cover" id="game_cover" value={form?.gameCoverLink ?? ""}>

    <img src={form?.gameCoverLink} alt="">

    <label for="game_released_date">Date de sortie</label>
    <input type="date" name="game_released_date" value={form?.gameReleaseDate ?? ""}>
  </div>

  <button type="submit" id="button-submit">Créer la fiche</button>

</form>

<style lang="scss">

  form {
    min-height: 100%;
    padding: 10px 5px 10px 5px;
    :has(label) {
      font-size: 0.8rem;
      font-style: italic;
    }
    img {
      height: 150px;
      margin: 15px 0;
    }
  }

  .form-inside-name, .form-inside-calendar, .form-inside-input {
    display: flex;
    flex-flow: row wrap;
  }

  .form-inside-name, .form-inside-calendar, .form-inside-input, .form-inside-notes, .form-inside-acquired {
    padding-top: 10px;
  }

  #button-submit {
    margin-left: 5px;
  }

  .form-inside-calendar, .form-inside-input {
    margin-top: 15px;
    gap: 10px;
  }
  .form-inside-input {
    margin-bottom: 15px;
  }

  .form-inside-name button {
    margin: 15px 0px 0px 15px;
  }
</style>