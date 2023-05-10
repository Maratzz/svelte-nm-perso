<script>
  import { supabase } from "$lib/utils/supabaseClient";
  let newcountry = '';

  async function addCountry() {
    await supabase
      .from('countries')
      .insert({ name: newcountry })
  }

</script>

<input type="text" bind:value={newcountry}>
<p>Vous allez ajouter {newcountry} à la base, okay?</p>
<button on:click={addCountry}>Valider</button>

