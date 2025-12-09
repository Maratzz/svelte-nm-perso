<script lang="ts">
  let { item, supabase, session } : {item: any, supabase: any, session: any } = $props()

  //TODO: check if a library delete option is easier, for example: I drag and drop
  // the item outside of any tier, and it would be removed from the tierlist, either
  // from a copy array or via a function on eventListener or something
  // Ideally deleting an item would update the page and refresh the data, making the item
  // visually disappear.
  async function deleteItem() {
    try {
      let { deleted, error } = await supabase
        .from("tier_items")
        .delete()
        .eq("tier_id", item.tier_id)
        .eq("item_id", item.item_id)
      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }
</script>

<div data-item-id={item.collection.id}>
  <a href="/collection/{item.collection.slug}">
    <img src={item.collection.cover} alt="Affiche du {item.collection.item_type} {item.collection.name}" >
  </a>
  {#if session}
    <button class="btn-danger" onclick={() => deleteItem()}>X</button>
  {/if}
</div>

<style>
  div {
    position: relative;
  }

  button {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 90px;
    aspect-ratio: 3/4;
    position: relative;
    object-fit: cover;
  }
</style>