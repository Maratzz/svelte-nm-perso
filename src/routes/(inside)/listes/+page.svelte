<script>
  import { enhance } from '$app/forms'
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
    import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  $: ({ listes, session } = data)
</script>

<HeadSEO 
  title="Nico Moisson | Listes"
  description="Des listes à n'en plus finir, des oeuvres à n'en plus vouloir"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
/>

<div>

  <h1>Listes</h1>

  {#if session}
  <form method="POST" action="?/insert" use:enhance>
    
    <FormData query="new_list" query_name="Nouvelle liste" placeholder="Comment s'appelle-t-elle ?"/>

    <FormData query="new_description" query_name="Description" placeholder="une liste pour quoi ?"/>

    <button type="submit">Créer la liste</button>
  </form>
  {/if}

  {#key listes}
  <div id="container">
    {#each listes as liste}
    <a href="/listes/{liste.slug}">{liste.name}</a>
    {/each}
  </div>
  {/key}

</div>

<style lang="scss">
  #container {
    height: 100%;
    margin-bottom: 50px;
  }

  a {
    display: block;
    &:not(:first-child) {
      margin-top: 6px;
    }
  }
</style>