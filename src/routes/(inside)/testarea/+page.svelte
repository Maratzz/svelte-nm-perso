<script>
  import { enhance } from "$app/forms"
  export let form
</script>

<form method="POST" action="?/search" use:enhance={() => {
  return ({ result, update }) => {
    if (result) {
      console.log("we got something")
      console.log(result)
    }
    update()
  }
}}>
  <label for="item_name">Flim</label>
  <input type="text" id="item_name" name="item_name">
  <button type="submit">Chercher</button>
</form>

{#if form?.success}
  <p>{form.data.itemName}</p>
  <p>{form.data.itemID}</p>
  <img src={form.data.itemCover} alt="Poster">
{/if}
