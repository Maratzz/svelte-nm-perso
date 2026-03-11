<script>
    import FormData from "$lib/components/FormData.svelte"
    import FormDataDate from "$lib/components/FormDataDate.svelte"

    export let item
</script>

<form action="?/update" method="post" id="form_update">

  <FormData query="item_ID" query_name="ID" value={item.id}/>

  <FormData query="item_name" query_name="Nom" value={item.name}/>

  <FormDataDate value={item.date_acquired ?? null} query="item_date_acquired" query_name="Acquis le:"/>

  <FormDataDate value={item.date_started ?? null} query="item_date_started" query_name="Commencé le:"/>

  <FormDataDate value={item.date_finished ?? null} query="item_date_finished" query_name="Terminé le:"/>

  <FormData query="item_status" query_name="Status" value={item.status}/>

  <label for="item_notes">Notes</label>

  <textarea name="item_notes" id="item_notes" value={item.notes ?? null}></textarea>

  <div id="is_approved">
    <input type="radio" name="is_approved" id="is_approved_true" value="TRUE" />
    <label for="is_approved_true">✅</label>
    <input type="radio" name="is_approved" id="is_approved_false" value="FALSE" />
    <label for="is_approved_false">❌</label>
  </div>

  <FormData query="item_tags" query_name="Tags" value={item.tags ?? null}/>

  <FormData query="item_author" query_name="Author(s)" value={item.author ?? null}/>

  <button type="submit">Mettre à jour</button>

</form>

<style lang="scss">
  button {
    margin-top: 15px;
  }

  :is(label) {
    font-size: 0.8em;
    font-style: italic;
    display: inline-block;
    margin-top: 10px
  }

  #is_approved {
    display: flex;
    flex-direction: row;
  }
</style>