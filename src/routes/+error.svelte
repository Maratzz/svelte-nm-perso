<script>
  import "$lib/styles/code_formatter.css"
  import "papercss/dist/paper.min.css"
  import "$lib/styles/styles.scss"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import Header from "$lib/components/Header.svelte"
  import Footer from "$lib/components/Footer.svelte"
</script>

<HeadSEO 
  title="Page introuvable | Nico Moisson"
  description="Erreur quatre sans quatre, ça fait zéro, comme l'absence de résultat qui vous a fait atterrir ici"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<Header />

<main>
  <div> 
    <h1>Cette page n'existe pas</h1>

    <p>ou peut-être qu'elle a été déplacée à une autre adresse.</p>
    <p>si vous pensez qu'il s'agit d'une erreur, <a href="mailto:nicolas.moisson@protonmail.com">contactez-moi !</a></p>
    <p>Sinon vous pouvez revenir à <a href="/">l'accueil.</a></p>
  </div>
</main>

<Footer />

<style lang="scss">
  main {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 80px;
      height: 20px;
      position: absolute;
      bottom: 0px;
      left: 290px;
    }
  }

  @media (min-width: 900px) {
    main { 
      padding-bottom: 150px;
    }
  }
</style>

