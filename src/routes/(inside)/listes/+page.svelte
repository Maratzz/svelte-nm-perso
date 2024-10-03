<script>
  import { enhance } from '$app/forms';
  import FormData from "$lib/components/FormData.svelte";

  export let data

  $: ({ listes, session } = data)

</script>

<div>

  <h1>Listes</h1>

  {#if session}
  <form method="POST" action="?/insert" use:enhance>
    
    <FormData query="new_list" query_name="Nouvelle liste" placeholder="Comment s'appelle-t-elle ?"/>

    <FormData query="new_description" query_name="Description" placeholder="une liste pour quoi ?"/>

    <button type="submit">Créer la liste</button>
  </form>
  {/if}

  {#each listes as liste}
    <a href="/listes/{liste.slug}">{liste.name}</a>
  {/each}

</div>

<style lang="scss">
  a {
    display: block;
  }
</style>