<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CultureItemPreview from "$lib/components/CultureItemPreview.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  let { liste } = data
  let singleList = liste[0]

  let itemCollection = liste[0].collection
  let innerCollection = []
  itemCollection.forEach(element =>
    innerCollection.push( element )
  )
</script>

<HeadSEO 
  title="Nico Moisson | {singleList.name}"
  description="Une liste du {singleList.name.toLowerCase()} avec plein d'oeuvres dedans"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
/>

<h1>{singleList.name}</h1>

<p>{singleList.description}</p>
<div class="container">
    {#each innerCollection as item}
    <CultureItemPreview {item} />
    {/each}
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