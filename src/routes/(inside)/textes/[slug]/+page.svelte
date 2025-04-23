<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FooterMore from "../../../../lib/components/FooterMore.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import { formatDate } from "$lib/utils/index.js"

  export let data

  let  { date, title, content, headline, categories, image } = data
</script>

<svelte:head>
  <title>{title} - Nico Moisson</title>
</svelte:head>

<HeadSEO 
  title="Nico Moisson | {title}"
  description="{headline}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={image ? `/${image}` : `${full_image}`}
  twitter
  openGraph
/>

<article>

  <h1>{title}</h1>
  <p>Publié le {formatDate( date )} dans {categories.length === 1 ? "la catégorie" : "les catégories"}{#each categories as category}<span class="category">{category}</span>{/each}</p>
  <svelte:component this={content} />

  <FooterMore/>

</article>

<style lang="scss">
  $color: hsl(253, 27%, 80%);

  .category {
    margin: 0 5px;
    background-color: $color;
    padding: 5px 10px;
    border-radius: 15px;
  }

  article {
    width: 90vw;
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 15px;
  }

  @media (min-width: 900px) {
    article {
      width: 40vw;
    }
  }
</style>