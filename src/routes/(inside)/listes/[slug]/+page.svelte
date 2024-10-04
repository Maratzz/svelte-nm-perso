<script>
  import { enhance } from "$app/forms"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  $: ({ liste, session, collection } = data)
  $: targetList = liste[0]
  $: itemsInCollection = liste[0].collection
</script>

<HeadSEO 
  title="Nico Moisson | {targetList.name}"
  description="Une liste du {targetList.name.toLowerCase()}, avec plein d'oeuvres dedans"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
/>

<div>
  <h1>{targetList.name}</h1>
  <p>{targetList.description}</p>

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
  {/if}
</div>

<div class="container">
  {#key itemsInCollection}
  {#each itemsInCollection as item}
  <CultureItemPreview {item} />
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
</style>