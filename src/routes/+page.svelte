<script>
  import MediaQuery from "$lib/components/MediaQuery.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import { goto } from "$app/navigation"
  import { fade } from "svelte/transition"

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

  $: hoverArea = null
  $: mouseX = 0
  $: mouseY = 0

  $: handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  $: handleAreaMouseEnter = (e) => {
    hoverArea = e.target.dataset.name
  }

  $: handleAreaMouseLeave = () => {
    hoverArea = null
  }

  //Svelte can enhance href in <a> elements but not for <area> elements.
  //To make currentRoute transitions work, we need to bypass default nav with this function
  const handleAreaClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    goto(href);
  }

  //<map> and <areas> are not responsive if the corresponding <img> changes size.
  //This function recalculates them so that all the <area> elements still match the modified <img> dimensions.
  const resizeImageMap = () => {
    let img = document.getElementsByClassName("mobile")[0]
    if (!img) return
    let width = img.clientWidth
    let height = img.clientHeight

    let areas = document.getElementsByClassName("area")
    for (let i = 0; i < areas.length; i++) {
      let coords = areas[i].getAttribute("coords").split(",")
      for (let j = 0; j < coords.length; j++) {
        if (j % 2 === 0) {
          coords[j] = Math.round(( coords[j] / img.naturalWidth) * width )
        } else {
          coords[j] = Math.round(( coords[j] / img.naturalHeight) * height )
        }
      }
      areas[i].setAttribute("coords", coords.join(","))
    }
  }
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
          <li><a href="/souvenirs">Souvenirs</a></li>
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
        <img src={bao_out} alt="Dessin d'un petit pain vapeur asiatique" class="no-border hover" id="homepage-bao-out" usemap="#baos">
        <img src={baos} alt="Dessin de plusieurs petits pains vapeur asiatiques dans un panier en bois" class="no-border" id="homepage-baos" usemap="#baos">
        <map name="baos">
          <area shape="poly" coords="16,0,40,12,39,31,19,38,1,28,0,12" href="/listes" alt="Listes" data-name="listes" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
          <area shape="poly" coords="-1,3,10,1,27,4,31,16,48,19,71,32,70,72,41,83,4,81,9,43" href="/listes" alt="Listes" data-name="listes" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={bourses} alt="Dessin d'une bourse de monnaie" class="no-border hover" id="homepage-bourses" usemap="#bourses">
        <map name="bourses">
          <area shape="poly" coords="51,27,66,23,93,34,83,52,96,59,89,75,76,66,77,112,71,127,41,131,17,126,7,103,0,88,2,64,12,49,38,41,50,42" href="/soutien" alt="Soutien" data-name="soutien" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={chest} alt="Dessin d'un coffre en bois" class="no-border hover" id="homepage-chest" usemap="#chest">
        <map name="chest">
          <area shape="poly" coords="51,43,67,53,93,57,109,52,128,59,139,77,133,111,131,145,89,160,23,140,10,108,1,76,14,51,33,43" href="/collection" alt="Collection" data-name="collection" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={coin_1} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-1">
        <img src={coin_2} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-2">
        <img src={coin_3} alt="Dessin d'une pièce de monnaie en l'air" class="no-border hover" id="homepage-coin-3">
        <img src={couvercle_bao} alt="Dessin d'un couvercle en osier d'un panier vapeur" class="no-border" id="homepage-couvercle-bao">
        <img src={feather} alt="Dessin d'une plume" class="no-border hover" id="homepage-feather" usemap="#feather">
        <map name="feather">
          <area shape="poly" coords="3,3,57,48,87,55,53,56,18,43,5,21" href="/blog" alt="Blog" data-name="blog" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={flag} alt="Dessin d'un drapeau flottant au vent" class="no-border hover" id="homepage-flag" usemap="#flag">
        <map name="flag">
          <area shape="poly" coords="149,6,75,183,64,174,106,78,89,80,21,110,0,40,73,1,104,7,132,6,134,0" href="/souvenirs" alt="Souvenirs" data-name="souvenirs" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={lanterne_left} alt="Dessin d'une lanterne" class="no-border hover" id="homepage-lanterne-left">
        <img src={lanterne_right} alt="Dessin d'une lanterne" class="no-border hover" id="homepage-lanterne-right">
        <img src={nico_body} alt="Dessin du corps du personnage" class="no-border" id="homepage-nico-body" usemap="#nico-body">
        <map name="nico-body">
          <area shape="poly" coords="198,154,205,136,231,136,232,158,200,169" href="/maintenant" alt="Maintenant" data-name="maintenant" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
          <area shape="poly" coords="265,137,279,135,295,147,296,161,269,162" href="/maintenant" alt="Maintenant" data-name="maintenant" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={nico_head} alt="Dessin de la tête du personnage" class="no-border hover" id="homepage-nico-head" usemap="#nico-head">
        <map name="nico-head">
          <area shape="poly" coords="14,12,38,7,62,0,90,4,105,19,115,37,118,66,95,91,56,88,23,88,1,57,7,29" href="/info" alt="À propos" data-name="info" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={parchemin} alt="Dessin d'un parchemin enroulé avec une ficelle" class="no-border hover" id="homepage-parchemin" usemap="#parchemin">
        <map name="parchemin">
          <area shape="poly" coords="3,12,22,1,33,5,38,23,58,31,58,53,74,67,52,82" href="/textes" alt="Textes" data-name="textes" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={poele} alt="Dessin d'une poêle de camping" class="no-border hover" id="homepage-poele">
        <img src={pot_tournesol} alt="Dessin d'un pot en terre cuite" class="no-border" id="homepage-pot-tournesol">
        <img src={potion} alt="Dessin d'une petite potion" class="no-border hover" id="homepage-potion">
        <img src={tournesol_bouture} alt="Dessin d'une bouture de tournesol dans un pot" class="no-border" id="homepage-tournesol-bouture">
        <img src={tournesol_left} alt="Dessin d'un tournesol dans un pot, tourné vers la gauche" class="no-border" id="homepage-tournesol-left">
        <img src={tournesol_middle} alt="Dessin d'un tournesol dans un pot, tourné vers l'avant" class="no-border" id="homepage-tournesol-middle" usemap="#tournesol-middle">
        <map name="tournesol-middle">
          <area shape="poly" coords="13,11,34,2,68,14,84,37,110,51,92,56,79,75,87,73,99,67,129,57,138,66,129,86,113,82,114,125,153,172,143,176,110,138,94,129,65,154,85,114,77,89,35,95,37,83,19,80,3,60,3,27" href="/statistiques" alt="Statistiques" data-name="statistiques" onmouseenter={handleAreaMouseEnter} onmouseleave={handleAreaMouseLeave} onmousemove={handleMouseMove} onclick={handleAreaClick}>
        </map>
        <img src={tournesol_right} alt="Dessin d'un tournesol dans un pot, tourné vers la droite" class="no-border" id="homepage-tournesol-right">
      </div>

      {#if hoverArea}
      <div class="hover-tooltip" style="left: {mouseX + 25}px; top: {mouseY + 15}px" transition:fade={{ duration: 300}}>
        {hoverArea === "info" ? "À propos"
        : hoverArea === "collection" ? "Collection"
        : hoverArea === "textes" ? "Textes"
        : hoverArea === "souvenirs" ? "Souvenirs"
        : hoverArea === "blog" ? "Blog"
        : hoverArea === "soutien" ? "Soutien"
        : hoverArea === "maintenant" ? "Maintenant"
        : hoverArea === "listes" ? "Listes"
        : hoverArea === "statistiques" ? "Statistiques"
        : ''}
      </div>
      {/if}
      {:else}
      <div id="landing-image">
        <img src={full_image} alt="Dessin de la page d'accueil" class="no-border mobile" width="888" height="800" usemap="#mobile-landing-image" onload={resizeImageMap}>
        <map name="mobile-landing-image">
          <area target="" alt="Collection" title="Collection" href="/collection" coords="314,444,295,377,319,350,354,351,383,363,429,364,431,405,423,452,386,466" shape="poly" class="area">
          <area target="" alt="Textes" title="Textes" href="/textes" coords="123,273,143,259,153,264,165,301,193,326,174,342,143,307" shape="poly" class="area">
          <area target="" alt="Blog" title="Blog" href="/blog" coords="67,190,101,224,149,246,119,250,88,241,68,216" shape="poly" class="area">
          <area target="" alt="Souvenirs" title="Souvenirs" href="/souvenirs" coords="514,133,603,97,649,105,656,97,671,105,594,284,583,273,624,177,607,177,535,210" shape="poly" class="area">
          <area target="" alt="Soutien" title="Soutien" href="/soutien" coords="244,401,267,401,283,414,269,442,266,501,222,512,203,498,198,478,189,448,206,424,232,417,245,420" shape="poly" class="area">
          <area target="" alt="Maintenant" title="Maintenant" href="/maintenant" coords="522,499,534,479,560,481,560,503,529,515" shape="poly" class="area">
          <area target="" alt="Maintenant" title="Maintenant" href="/maintenant" coords="593,482,612,481,623,492,627,510,595,507" shape="poly" class="area">
          <area target="" alt="À propos" title="À propos" href="/info" coords="506,373,515,355,544,351,585,348,610,376,614,417,580,439,550,432,519,432,503,412,494,390" shape="poly" class="area">
          <area target="" alt="Listes" title="Listes" href="/listes" coords="622,325,648,326,656,299,674,286,695,299,696,318,676,325,655,335,693,356,692,398,669,409,628,408,631,362" shape="poly" class="area">
          <area target="" alt="Statistiques" title="Statistiques" href="/statistiques" coords="153,100,158,66,186,51,219,62,232,86,258,99,228,110,250,114,283,106,279,128,261,148,267,157,295,155,267,172,305,223,296,227,245,180,227,190,236,160,223,135,187,140,176,127" shape="poly" class="area">
        </map>
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

    .hover-tooltip {
      position: fixed;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 15px;
      border-radius: 15px;
      pointer-events: none;
      z-index: 100;
      transition: opacity 0.6s;
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
        z-index: 1;
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
        z-index: 1;
      }
      &-flag {
        top: 11%;
        left: 59%;
        z-index: 1;
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
        z-index: 1;
      }
      &-nico-body {
        top: 43%;
        left: 38%;
      }
      &-nico-head {
        top: 43%;
        left: 56.5%;
        z-index: 1;
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
