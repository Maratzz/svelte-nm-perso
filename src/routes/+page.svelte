<script>
  import MediaQuery from "$lib/components/MediaQuery.svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"

  import background from "$lib/assets/homepage/background.png"
  import full_image from "$lib/assets/homepage/full_image.png"
</script>

<HeadSEO 
  title="Nico Moisson"
  description="C'est mon site perso, il y en a plein comme lui sur Internet mais celui-là c'est le mien"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
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
          <li><a href="/blog">Blog</a></li>
          <li><a href="/info">À propos</a></li>
          <li><a href="/protected">Connexion</a></li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<main>

  <div id="landing-container">

    <div id="landing-image">
      <img src={full_image} alt="Dessin de la page d'accueil" class="no-border">
    </div>

    <div id="landing-presentation">
      <p class="first-offset">Bonjour, je suis <span class="highlight">Nico</span> aka <span class="highlight">Maratz</span></p>
      <p>Écrivain, critique, développeur web, <i>shitposter</i>.</p>
      <p>Ce site est mon espace personnel sur Internet,<br> j"y mets toutes mes affaires et le reste.</p>
      <p>Bonne visite !</p>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125" fill="#E1DAEA" class="underline">
      <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"></path>
    </svg>

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

<footer>
  <nav class="removePaperLi">
    <ul id="footer-menu">
      <li><a href="soutien">Soutenez-moi</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/mentions">Mentions légales</a></li>
      <li><a href="/site-pro">Site pro</a></li>
    </ul>    
  </nav>
</footer>

<style lang="scss">
  main, header, footer {
    box-sizing: border-box;
    background-color: #fff;
  }

  nav label, nav h3 {
    margin-top: 5px;
  }

  #footer-menu {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid blue;
    text-align: start;
  }

  #landing {
    &-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      width: 100vw;
      height: 100vh;
    }

    &-image {
      padding-top: 35px;
    }

    &-presentation {
      width: 95vw;
      margin: 0 auto;
      text-align: center;
    }
  }

  #learn-more-container {
    position: relative;
    width: 95vw;
    margin: 0 auto;
    z-index: 5;
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

  footer {
    margin: 0 auto;
  }

  @media (width >= 900px) {
    #nav-menu {
      flex-direction: row;
    }

    #landing-container {
      flex-direction: row;
      align-content: center;
      justify-content: center;
    }

    .underline {
      display: none;
    }
  }
</style>
