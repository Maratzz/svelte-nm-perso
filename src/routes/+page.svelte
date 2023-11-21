<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  import MediaQuery from '$lib/components/MediaQuery.svelte'

  import background from '$lib/assets/homepage/background.png'
  import bag from '$lib/assets/homepage/bag.png'
  import bao_out from '$lib/assets/homepage/bao_out.png'
  import baos from '$lib/assets/homepage/baos.png'
  import bourses from '$lib/assets/homepage/bourses.png'
  import chest from '$lib/assets/homepage/chest.png'
  import coin_1 from '$lib/assets/homepage/coin_1.png'
  import coin_2 from '$lib/assets/homepage/coin_2.png'
  import coin_3 from '$lib/assets/homepage/coin_3.png'
  import couvercle_bao from '$lib/assets/homepage/couvercle_bao.png'
  import feather from '$lib/assets/homepage/feather.png'
  import flag from '$lib/assets/homepage/flag.png'
  import full_image from '$lib/assets/homepage/full_image.png'
  import lanterne_left from '$lib/assets/homepage/lanterne_left.png'
  import lanterne_right from '$lib/assets/homepage/lanterne_right.png'
  import nico_body from '$lib/assets/homepage/nico_body.png'
  import nico_head from '$lib/assets/homepage/nico_head.png'
  import parchemin from '$lib/assets/homepage/parchemin.png'
  import poele from '$lib/assets/homepage/poele.png'
  import pot_tournesol from '$lib/assets/homepage/pot_tournesol.png'
  import potion from '$lib/assets/homepage/potion.png'
  import tournesol_bouture from '$lib/assets/homepage/tournesol_bouture.png'
  import tournesol_left from '$lib/assets/homepage/tournesol_left.png'
  import tournesol_middle from '$lib/assets/homepage/tournesol_middle.png'
  import tournesol_right from '$lib/assets/homepage/tournesol_right.png'

  if (browser) {
    window.addEventListener('DOMContentLoaded', () => {
      const svg = document.getElementById('#svg')
      console.log(svg)
    })
  }
  
  // const onload = (el) => {
  //   console.log('ready')
    
  //   svg.addEventListener('load', () => {
  //     const svgContent = svg.contentDocument
  //     svgContent.forEach( content => {
  //       content.addEventListener('mouseover', () => {
  //         console.log(content.id)
  //       })
  //     });
  //   })
  // }
 

  
</script>

<svelte:head>
  <title>Accueil - Nico Moisson</title>
  <meta name="description" content="Site personnel de Nico, aka Maratz">
</svelte:head>

<div id="homepage">
  <div id="navigation">
    <MediaQuery query="(min-height: 800px) and (min-width: 500px)" let:matches>
      {#if matches}
        <img src={background} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-background">
        <img src={bag} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-bag">
        <img src={bao_out} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-bao-out">
        <img src={baos} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-baos">
        <img src={bourses} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-bourses">
        <img src={chest} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-chest">
        <img src={coin_1} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-1">
        <img src={coin_2} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-2">
        <img src={coin_3} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-3">
        <img src={couvercle_bao} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-couvercle-bao">
        <img src={feather} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-feather">
        <img src={flag} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-flag">
        <img src={lanterne_left} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-lanterne-left">
        <img src={lanterne_right} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-lanterne-right">
        <img src={nico_body} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-nico-body">
        <img src={nico_head} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-nico-head">
        <img src={parchemin} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-parchemin">
        <img src={poele} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-poele">
        <img src={pot_tournesol} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-pot-tournesol">
        <img src={potion} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-potion">
        <img src={tournesol_bouture} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-bouture">
        <img src={tournesol_left} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-left">
        <img src={tournesol_middle} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-middle">
        <img src={tournesol_right} alt="Élément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-right">
      {/if}
    </MediaQuery>
    <MediaQuery query="(max-width: 900px)" let:matches>
      {#if matches}
        <img src={full_image} alt="Illustration d'accueil" class='no-border'>
      {/if}
    </MediaQuery>
  </div>
  <!-- <img src={background_desktop} alt="blob"> -->
  
</div>

<style lang='scss'>
  #homepage {
    background-color: #FFF;
    box-sizing: border-box;
    z-index: 50;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    &-bag {
      top: 26%;
      left: 18%;
    }
    &-bao-out {
      top: 36%;
      left: 77%;
    }
    &-baos {
      top: 39%;
      left: 71.5%;
    }
    &-bourses {
      top: 47%;
      left: 22.1%;
    }
    &-chest {
      top: 37%;
      left: 33%;
    }
    &-coin-1 {
      top: 55%;
      left: 13%;
    }
    &-coin-2 {
      top: 51.5%;
      left: 16%;
    }
    &-coin-3 {
      top: 54%;
      left: 18%;
    }
    &-couvercle-bao {
      top: 31%;
      left: 68.5%;
    }
    &-feather {
      top: 24%;
      left: 7%;
    }
    &-flag {
      top: 12%;
      left: 60%;
    }
    &-lanterne-left {
      top: 62%;
      left: 29%;
    }
    &-lanterne-right {
      top: 64.2%;
      left: 41.8%;
    }
    &-parchemin {
      top: 33%;
      left: 14%;
    }
    &-pot-tournesol {
      top: 25.1%;
      left: 32.5%;
    }
    &-potion {
      top: 30%;
      left: 19%;
    }
    &-nico-body {
      top: 42%;
      left: 38%;
    }
    &-nico-head {
      top: 42%;
      left: 57%;
    }
    &-poele {
      top: 64%;
      left: 33%;
    }
    &-tournesol-bouture {
      top: 24%;
      left: 24%;
    }
    &-tournesol-left {
      top: 17%;
      left: 16%;
    }
    &-tournesol-middle {
      top: 5%;
      left: 18%;
    }
    &-tournesol-right {
      top: 8.5%;
      left: 33%;
    }
  }

  #navigation {
    position: relative;
    width: 880px;
    height: 800px;
    z-index: 15;
    & img {
      position: absolute;
    }
  }
    

</style>
