<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import { onMount } from "svelte"
  import { supabase } from "$lib/utils/supabaseClient"

  let author
  let results = []

  onMount(async () => {
    author = localStorage.getItem('authorName')

    if (author) {
      const { data, error } = await supabase
        .from("collection")
        .select("*")
        .contains("author", [author])
        .order("date_released", {ascending: true})
      results = data
    }
  })
</script>

<HeadSEO
  title="Nico Moisson | {author}"
  description="Toutes les oeuvres par {author} que j'ai explorées"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
/>

<div>
  <h1>{author}</h1>
</div>

<div class="container">
  {#each results as item}
    <CultureItemPreview {item} />
  {/each}
</div>

<style lang="scss">
  @use "sass:color";
  $color: hsl(253, 27%, 80%);

  h1 {
    z-index: 2;
    position: relative;
    width: fit-content;
    margin-bottom: 50px;
  }

  h1::after {
    z-index: -1;
    content: "";
    display: inline-block;
    width: 80px;
    height: 25px;
    background-color: $color;
    position: absolute;
    left: 10px;
    bottom: -5px;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
    gap: 30px;
  }
</style>