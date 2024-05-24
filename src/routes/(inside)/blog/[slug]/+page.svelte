<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data;

  let { date, title, content, headline, categories, image } = data
  let options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  let humanDate = new Date(date).toLocaleDateString( "fr", options )
</script>

<HeadSEO 
  title="Nico Moisson | {title}"
  description="{headline}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{image}"
  twitter
  openGraph
/>

<article>
  <h1>{title}</h1>
  <p>Publié le {humanDate} dans {categories.length === 1 ? "la catégorie" : "les catégories"}{#each categories as category}<span class="category">{category}</span>{/each}</p>
  <svelte:component this={content} />
</article>


<style>
  .category {
    margin: 0 3px;
    background-color: #C5BEDA;
    padding: 4px 4px;
  }

  article {
    width: 90vw;
    margin: 0 auto;
    padding-bottom: 15px;
  }

  @media (min-width: 900px) {
    article {
      width: 40vw;
    }
  }
</style>