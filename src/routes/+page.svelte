<script>
  import MediaQuery from "$lib/components/MediaQuery.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import { writable } from "svelte/store"

  import full_image from "$lib/assets/homepage/full_image.webp"
  import full_image_webp from "$lib/assets/homepage/full_image.webp"
  import openGraph from "$lib/assets/homepage/full_image.webp"
  import background from "$lib/assets/homepage/background.webp"
  import bag from "$lib/assets/homepage/bag.webp"
  import bao_out from "$lib/assets/homepage/bao_out.webp"
  import baos from "$lib/assets/homepage/baos.webp"
  import bourses from "$lib/assets/homepage/bourses.webp"
  import chest from "$lib/assets/homepage/chest.webp"
  import coin_1 from "$lib/assets/homepage/coin_1.webp"
  import coin_2 from "$lib/assets/homepage/coin_2.webp"
  import coin_3 from "$lib/assets/homepage/coin_3.webp"
  import couvercle_bao from "$lib/assets/homepage/couvercle_bao.webp"
  import feather from "$lib/assets/homepage/feather.webp"
  import flag from "$lib/assets/homepage/flag.webp"
  import lanterne_left from "$lib/assets/homepage/lanterne_left.webp"
  import lanterne_right from "$lib/assets/homepage/lanterne_right.webp"
  import nico_body from "$lib/assets/homepage/nico_body.webp"
  import nico_head from "$lib/assets/homepage/nico_head.webp"
  import parchemin from "$lib/assets/homepage/parchemin.webp"
  import poele from "$lib/assets/homepage/poele.webp"
  import pot_tournesol from "$lib/assets/homepage/pot_tournesol.webp"
  import potion from "$lib/assets/homepage/potion.webp"
  import tournesol_bouture from "$lib/assets/homepage/tournesol_bouture.webp"
  import tournesol_left from "$lib/assets/homepage/tournesol_left.webp"
  import tournesol_middle from "$lib/assets/homepage/tournesol_middle.webp"
  import tournesol_right from "$lib/assets/homepage/tournesol_right.webp"

  $: linkMap = {
    'homepage-bourses': { url: '/soutien', text: 'Soutien'},
    'homepage-chest': { url: '/collection', text: 'Collection'},
    'homepage-feather': { url: '/blog', text: 'Blog'},
    'homepage-flag': { url: '/souvenirs', text: 'Souvenirs'},
    'homepage-nico-head': { url: '/info', text: 'À propos'},
    'homepage-parchemin': { url: '/textes', text: 'Textes'},
    'homepage-tournesol-middle': { url: '/#', text: 'TBD'},
    'homepage-tournesol-right': { url: '/#', text: 'TBD'}
  }

  $: activeLink = null
  $: console.log('le lien actif est:', activeLink)

</script>

<HeadSEO 
  title="Nico Moisson"
  description="C'est mon site perso, il y en a plein comme lui sur Internet mais celui-là c'est le mien"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{openGraph}"
  twitter
  openGraph
/>

<header>
  <nav class="no-border fixed">
    <div class="nav-brand">
      <h3><a href="/">Nico Moisson</a></h3>
    </div>
    <div class="collapsible">
      <input id="collapsible1" type="checkbox" name="collapsible1">
      <label for="collapsible1">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </label>
      <div class="collapsible-body">
        <ul class="inline" id="nav-menu">
          <li id="nav-textes"><a href="/textes">Textes</a></li>
          <li><a href="/collection">Collection</a></li>
          <li><a href="/listes">Listes</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/maintenant">Maintenant</a></li>
          <li><a href="/info">À propos</a></li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<main>

  <div id="landing-container">

    <MediaQuery query="(min-height: 750px) and (min-width: 500px)" let:matches>
      {#if matches}
      <div id="landing-image">
        <img src={background} alt="Fond de couleur pour l'illustration d'accueil" class="no-border" id="homepage-background">
        <img src={bag} alt="Dessin d'un gros sac à dos" class="no-border" id="homepage-bag">
        <img src={bao_out} alt="Dessin d'un petit pain vapeur asiatique" class="no-border hover" id="homepage-bao-out">
        <img src={baos} alt="Dessin de plusieurs petits pains vapeur asiatiques dans un panier en bois" class="no-border" id="homepage-baos">
        <img src={bourses} alt="Dessin d'une bourse de monnaie" class="no-border hover" id="homepage-bourses" onmouseenter={() => activeLink = linkMap['homepage-bourses']} onmouseleave={() => activeLink = null}>
        <img src={chest} alt="Dessin d'un coffre en bois" class="no-border hover" id="homepage-chest" onmouseenter={() => activeLink = linkMap['homepage-chest']} onmouseleave={() => activeLink = null}>
        <img src={coin_1} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-1">
        <img src={coin_2} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-2">
        <img src={coin_3} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-3">
        <img src={couvercle_bao} alt="Dessin d'un couvercle en osier d'un panier vapeur" class="no-border" id="homepage-couvercle-bao">
        <img src={feather} alt="Dessin d'une plume" class="no-border hover" id="homepage-feather" onmouseenter={() => activeLink = linkMap['homepage-feather']} onmouseleave={() => activeLink = null}>
        <img src={flag} alt="Dessin d'un drapeau flottant au vent" class="no-border hover" id="homepage-flag" onmouseenter={() => activeLink = linkMap['homepage-flag']} onmouseleave={() => activeLink = null}>
        <img src={lanterne_left} alt="Dessin d'une lanterne" class="no-border hover" id="homepage-lanterne-left">
        <img src={lanterne_right} alt="Dessin d'une lanterne" class="no-border hover" id="homepage-lanterne-right">
        <img src={nico_body} alt="Dessin du corps du personnage" class="no-border" id="homepage-nico-body">
        <img src={nico_head} alt="Dessin de la tête du personnage" class="no-border hover" id="homepage-nico-head" onmouseenter={() => activeLink = linkMap['homepage-nico-head']} onmouseleave={() => activeLink = null}>
        <img src={parchemin} alt="Dessin d'un parchemin enroulé avec une ficelle" class="no-border hover" id="homepage-parchemin" onmouseenter={() => activeLink = linkMap['homepage-parchemin']} onmouseleave={() => activeLink = null}>
        <img src={poele} alt="Dessin d'une poêle de camping" class="no-border hover" id="homepage-poele">
        <img src={pot_tournesol} alt="Dessin d'un pot en terre cuite" class="no-border" id="homepage-pot-tournesol">
        <img src={potion} alt="Dessin d'une petite potion" class="no-border hover" id="homepage-potion">
        <img src={tournesol_bouture} alt="Dessin d'une bouture de tournesol dans un pot" class="no-border" id="homepage-tournesol-bouture">
        <img src={tournesol_left} alt="Dessin d'un tournesol dans un pot, tourné vers la gauche" class="no-border" id="homepage-tournesol-left">
        <img src={tournesol_middle} alt="Dessin d'un tournesol dans un pot, tourné vers l'avant" class="no-border" id="homepage-tournesol-middle" onmouseenter={() => activeLink = linkMap['homepage-tournesol-middle']} onmouseleave={() => activeLink = null}>
        <img src={tournesol_right} alt="Dessin d'un tournesol dans un pot, tourné vers la droite" class="no-border" id="homepage-tournesol-right" onmouseenter={() => activeLink = linkMap['homepage-tournesol-right']} onmouseleave={() => activeLink = null}>
      </div>
      {:else}
      <div id="landing-image">
        <picture>
          <source srcset={full_image_webp} type="image/webp">
          <img src={full_image} alt="Dessin de la page d'accueil" class="no-border" width="888" height="800">
        </picture>
      </div>
      {/if}

    </MediaQuery>


    <div id="landing-presentation">
      <p class="first-offset">Bonjour, je suis <span class="highlight">Nico</span> aka <span class="highlight">Maratz</span></p>
      <p>Écrivain, critique, développeur web, <i>shitposter</i>.</p>
      <p>Ce site est mon espace personnel sur Internet,<br> j"y mets toutes mes affaires et le reste.</p>
      <p>Bonne visite !</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125" fill="#E1DAEA" class="underline">
        <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"></path>
      </svg>
    </div>

  </div>

  <div id="learn-more-container">
    <img src={background} alt="décor" class="no-border" id="first">
    <img src={background} alt="décor" class="no-border" id="second">
    <h4>Qu'est-ce qu'il y a dans ce sac&nbsp;?</h4>
    <p>Vous trouverez donc ici des <a href="/textes">textes critiques, des poèmes, des nouvelles</a>. Avec des phrases courtes et un certain sens de la musique des mots, parce que j'aime Marguerite Duras plus que de raison. Avec beaucoup de jeux vidéo dedans, parce que c'est le medium que je préfère, après la littérature.</p>
    <p>Et puis il y a tout le reste. Des billets de <a href="/blog">blog</a>, une <a href="/collection">collection</a> d'objets culturels, des listes par <strike>dizaines</strike> centaines, des bricolages de dev web, des surprises comme Internet sait en faire.</p>

    <p>Ce site est à <a href="/info">mon image</a>, changeant, vivant. Il se remplira progressivement de secrets, de pages cachées, et de surprises dans le code.</p>
    <p>Je prône la curiosité et le ré-enchantement en vertus cardinales pour être heureux·se, en vrai comme en faux, dans la vie comme sur le web. Explorez, fouillez, flânez.</p>
    <p>C'est mon espace, et donc le vôtre également.</p>
  </div>

</main>

<Footer />

<style lang="scss">
  main, header {
    box-sizing: border-box;
    background-color: #fff;
  }

  nav label, nav h3 {
    margin-top: 5px;
  }

  :is(a:link, a:visited) {
      color: #8260b2;
    }
    :is(a:active, a:focus, a:hover) {
      color: #c1abe1;
      text-decoration: underline;
    }

  #landing {
    &-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      width: 99vw;
      height: 100vh;
    }

    &-image {
      padding-top: 35px;
      position: relative;
    }

    &-presentation {
      width: 95vw;
      margin: 0 auto;
      text-align: center;

      .underline {
        width: 250px;
      }
    }
  }

  #learn-more-container {
    position: relative;
    width: 90vw;
    margin: 0 auto 50px auto;
    z-index: 5;
    background-color: #fff;
    padding-bottom: 100px;
    p, h4 {
      position: inherit;
      z-index: inherit;
    }
    h4 {
      margin: 0 auto;
    }
    #first {
      position: absolute;
      top: 0;
      left: -140px;
      z-index: 1;
    }
    #second {
      position: absolute;
      bottom: 35px;
      right: 0;
      z-index: 1;
      width: 60%;
    }
  }

  .inline {
    display: flex;
    flex-direction: column;
  }

  .highlight {
    background-color: #E1DAEA;
    padding: 5px 8px 2px 8px;
    border-radius: 10px;
  }

  .underline {
    width: 50vw;
    margin: 0 auto;
  }

  @media (min-width: 900px) {

    header {
      display: none;
    }

    #landing {
      &-container {
        flex-direction: row;
        height: 100vh;
      }
      &-image {
        width: 888px;
        height: 800px;
        position: relative;
        padding-top: 0;
        img {
          position: absolute;
        }
      }
      &-presentation {
        width: 33%;
        margin: auto auto;
        flex-grow: 1;
      }
    }

    #homepage {
      &-bag {
        top: 26%;
        left: 18%;
      }
      &-background {
        width: auto;
        height: 100%;
      }
      &-bao-out {
        top: 35%;
        left: 74%;
      }
      &-baos {
        top: 39.5%;
        left: 71.1%;
      }
      &-bourses {
        top: 47%;
        left: 22.1%;
      }
      &-chest {
        top: 37%;
        left: 33%;
        z-index: 10;
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
        top: 30%;
        left: 67.4%;
      }
      &-feather {
        top: 24%;
        left: 7%;
      }
      &-flag {
        top: 11%;
        left: 59%;
      }
      &-lanterne-left {
        top: 62%;
        left: 29%;
      }
      &-lanterne-right {
        top: 64.2%;
        left: 41.8%;
        z-index: 10;
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
        top: 43%;
        left: 38%;
      }
      &-nico-head {
        top: 43%;
        left: 56.5%;
      }
      &-poele {
        top: 65%;
        left: 32.8%;
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

    #learn-more-container {
      width: 75vw;
      margin-top: 100px;
      margin-bottom: 100px;
      padding-bottom: 100px;
      #first {
        top: 0;
        left: 0;
        width: 450px;
      }
      #second {
        width: 250px;
      }
    }
  }

  @media (min-width: 1440px) {
    #landing {
      &-container {
        align-items: center;
        justify-content: space-around;
      }

      &-presentation {
        flex-grow: 0;
        margin: 0 0;
      }
    }
  }
</style>
