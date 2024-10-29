<script>
  import { enhance } from "$app/forms"
  import toast, { Toaster } from "svelte-french-toast"
  import FormData from "$lib/components/FormData.svelte";

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
      console.log(result)
      update()
    }
  }
}}>

  <div class="form-inside-name">

    <div>
      <FormData type="text" query="item_name" query_name="Nom" value={form?.newItemName ?? ""} size="13"/>
      <FormData type="text" query="item_date_greater" query_name="Année" size="8"/>
    </div>

    <button type="submit" formaction="?/searchGameDB">IGDB API</button>
    <button type="submit" formaction="?/searchMovieDB"> TMDB</button>
    <button type="submit" formaction="?/searchAnimeDB"> ANI API</button>

  </div>

  <div class="form-inside-acquired">
    <FormData type="date" query="item_date_acquired" query_name="Acquis le:" value={form?.newDateAcquired ?? ""}/>
  </div>

  <div class="form-inside-calendar">

    <div>
      <FormData type="date" query="item_date_started" query_name="Démarré le:" value={form?.newDateStarted ?? ""}/>
    </div>

    <div>
      <FormData type="date" query="item_date_finished" query_name="Fini le:" value={form?.newDateFinished ?? ""}/>
    </div>

  </div>

  <div class="form-inside-input">

    <div>
      <label for="item_type">Type</label>
      <input list="item_type" name="item_type" size="13" value={form?.newItemType ?? ""}>
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
    <FormData type="text" query="item_author" query_name="Autrice(s)" value={form?.newAuthor ?? ""}/>

    <FormData type="text" query="item_original_name" query_name="Nom original" value={form?.newOriginalName ?? ""}/>

    <FormData type="url" query="item_cover" query_name="Image" value={form?.newCover ?? ""}/>

    <img src={form?.newCover} alt="">

    <FormData type="date" query="item_date_released" query_name="Date de sortie" value={form?.newDateReleased ?? ""}/>
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