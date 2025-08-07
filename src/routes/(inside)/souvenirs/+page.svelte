<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount, type Component } from "svelte"

  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  
  let { data } = $props()
  let { souvenirs } = data

  let MapComponentClientSide = $state.raw<Component>()

  onMount(async () => {
    const { default: Map } = await import ("$lib/components/LeafletMap.svelte")
    MapComponentClientSide = Map
  })
</script>

<HeadSEO
  title="Nico Moisson | Souvenirsssss"
  description="À la poursuite de Nico, sans Diego"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>

  <h1>Souvenirs</h1>

  <p>
    Dans un coffre en bois massif,<br/>
    relégué au fond d'un grenier<br/>
    des jouets, des peluches,<br/>
    des jeux, des pelotes,<br/>
    et une vieille carte au trésor au papier jauni<br/>
    chaque marque dessus, un souvenir,<br/>
    chaque annotation, un passage<br/>
    dans le tunnel du temps.
  </p>

  {#if browser}
    <MapComponentClientSide {souvenirs}/>
  {/if}

</div>

<style lang="scss">
  h1 {
    z-index: 2;
    position: relative;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 140px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 70px;
    }
  }
</style>