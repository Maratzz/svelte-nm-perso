<script>
  import { enhance } from "$app/forms"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import AlerteContexte from "$lib/components/AlerteContexte.svelte"
  import { invalidateAll } from "$app/navigation"

  export let data

  $: ({ liste, session, collection, supabase } = data)
  $: targetList = liste[0]
  $: itemsInCollection = liste[0].collection

  $: deleteItem = async ( element, liste ) => {
    let listeSlug = await liste.slug
    try {
      const { data, error } = await supabase
        .from("collection_lists_m2m")
        .delete()
        .match({ collection_slug: element.slug, list_slug: listeSlug })
      if ( error ) {
        throw error
      }
    } catch ( error ) {
      console.warn( error | error.message )
    } finally {
      invalidateAll()
    }
  }
</script>

<HeadSEO 
  title="Nico Moisson | {targetList.name}"
  description="{targetList.description}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>
  <h1>{targetList.name}</h1>
  <p>{targetList.description}</p>
  <p class="info-small"><a href="/listes">Revenir à toutes les listes</a></p>

  {#if session}

  <form method="POST" action="?/insert" use:enhance>
    <label for="item_to_add">Ajouter une oeuvre</label>
    <input list="item_to_add" name="item_to_add" required>
    <datalist id="item_to_add">
      {#each collection as item}
      <option value={item.slug}></option>
      {/each}
    </datalist>
    <button type="submit">Ajouter à la liste</button>
  </form>
  
  {#if itemsInCollection.length >= 5}
  <AlerteContexte content="La liste est pleine, swap les oeuvres"/>
  {/if}

  {/if}
</div>

<div class="container">
  {#key itemsInCollection}
  {#each itemsInCollection as item}
  <div class="item">
    <CultureItemPreview {item} />
    {#if session}
      <button on:click={() => deleteItem( item, targetList )} class="btn-danger">X</button>
    {/if}
  </div>
  {/each}
  {/key}
</div>

<style lang="scss">
  .container {
    display: flex;
    position: relative;
    flex-flow: row wrap;
    gap: 30px;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .item {
    position: relative;
    button {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 15px;
      height: 15px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>