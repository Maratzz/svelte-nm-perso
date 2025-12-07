<script>
  import { enhance } from "$app/forms"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import AlerteContexte from "$lib/components/AlerteContexte.svelte"
  import { invalidateAll } from "$app/navigation"
  import TierList from "$lib/components/TierList.svelte"

  export let data

  $: ({ liste, session, collection, supabase } = data)

  //TODO: rework this func to delete items in the tiers
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
  title="Nico Moisson | {liste.name}"
  description="{liste.description}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>
  <h1>{liste.name}</h1>
  <p>{liste.description}</p>
  <p class="info-small">
    <a href="/listes">Revenir à toutes les listes</a>
  </p>

  <TierList tierSection={liste.tiers} tierlistID={liste.id}/>

  {#if session}
  <form action="?/insertNewTier" method="POST" use:enhance>
    <input type="text" name="tier_to_add" required placeholder="ajouter un label">
    <input type="color" name="color_for_new_tier" required>
    <input type="number" name="tier_order" required>
    <input type="number" name="tierlist" value={liste.id}>
    <button type="submit">Ajouter le tier</button>
  </form>
  {/if}
</div>