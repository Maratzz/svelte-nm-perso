<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import { formatDate } from "$lib/utils"

  export let data

  let { patchNotes } = data
</script>

<HeadSEO 
  title="Nico Moisson | Mises à jour"
  description="Toute l'évolution du site, présentée en notes de patch"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
  twitter
  openGraph
/>

<div>
  <h1>Mises à jour</h1>
  {#each patchNotes as patch}
    <h2>{patch.version}</h2>
    <p class="date">{formatDate(patch.date)}</p>
    <p>{patch.notes}</p>
  {/each}
</div>

<style>
  h2 {
    margin-bottom: 5px;
    margin-top: 25px;
  }
  .date {
    font-size: 0.7em;
    font-style: italic;
    margin-top: 5px;
  }
  p {
    white-space: pre-wrap;
  }
</style>