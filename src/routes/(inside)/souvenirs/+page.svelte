<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
	import LeafletMap from '$lib/components/LeafletMap.svelte'
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data
  let { souvenirs } = data
</script>

<HeadSEO 
  title="Nico Moisson | Souvenirs"
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

  <div class="map">
    <LeafletMap {souvenirs}/>
  </div>

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

  .map {
    width: 100%;
    height: 50vh;
  }
</style>

