<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"

  export let data
  let { slug, results } = data
</script>

<HeadSEO
  title="Nico Moisson | {slug}"
  description="Fiche de {slug}"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL=""
/>

<div>
  <h1>{results[0].author}</h1>
</div>

<div class="container">
  {#each results as item}
    <CultureItemPreview {item} />
  {/each}
</div>

<style lang="scss">
  @use "sass:color";
  $color: hsl(253, 27%, 80%);

  .container {
    display: flex;
    flex-flow: row wrap;
    gap: 30px;
  }
</style>