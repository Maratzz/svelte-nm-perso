<script>
  import { enhance } from '$app/forms'
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import CollectionFilter from '$lib/components/CollectionFilter.svelte';

  export let data

  $: ({ listes, listesThemes, session } = data)
  $: selectedThemes = []
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

  <p>L'algorithme de découverte Netflix ou Steam vous renvoie toujours les mêmes oeuvres et ça vous lasse ? Plutôt que de piocher dans un top 10 quelconque vous aimeriez découvrir selon des thèmes originaux, loufoques ou peu explorés ? Ça tombe bien, j'adore faire des listes pour tout et n'importe quoi. Dedans, 5 titres au maximum, sans classement, et la garantie d'une sélection à la main, sans algorithme ni publicité mensongère. Et si vous avez des idées de listes sympas, <a href="/contact">n'hésitez pas à me les soumettre.</a></p>

  {#if session}
  <form method="POST" action="?/insert" use:enhance>

    <FormData query="new_list" query_name="Nouvelle liste" placeholder="Comment s'appelle-t-elle ?"/>

    <FormData query="new_description" query_name="Description" placeholder="une liste pour quoi ?"/>

    <button type="submit">Créer la liste</button>
  </form>
  {/if}

  {#key listes}
  <div id="container">

    <CollectionFilter categories={listesThemes} bind:selectedCategories={selectedThemes}/>
      <div>
        <h2>Cinéma</h2>
        {#each listes as liste}
          {#if liste.type === "film"}
            <a href="/listes/{liste.slug}">{liste.name}</a>
          {/if}
        {/each}
      </div>
      <div>
        <h2>Jeux vidéo</h2>
        {#each listes as liste}
          {#if liste.type === "jeu vidéo"}
            <a href="/listes/{liste.slug}">{liste.name}</a>
          {/if}
        {/each}
      </div>
  </div>
  {/key}

</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 70px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }
  #container {
    height: 100%;
    margin-bottom: 50px;

    a {
      display: block;
      &:not(:first-child) {
        margin-top: 6px;
      }
    }
  }
</style>