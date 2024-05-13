<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte";
</script>

<HeadSEO 
  title="Nico Moisson | Crédits"
  description="Une liste des ressources et inspirations utilisées pour créer ce site"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<div>
  <h1>Crédits</h1>
  
  <p>Ce site a été construit grâce à plusieurs ressources et outils que j'aimerais lister ici pour les remercier de leur contribution, et vous donner des références qui pourraient vous inspirer à votre tour.</p>

  <p>Le framework JavaScript qui fait tout tourner derrière est <a href="https://kit.svelte.dev/">SvelteKit</a>, créé par <a href="https://github.com/Rich-Harris">Richard Harris</a> et de nombreux.se.s contributeur.rice.s</p>
  <p>Le site est hebergé sur <a href="https://vercel.com">Vercel.</a>, sur la base d'un repositoire <a href="https://github.com/Maratzz/svelte-nm-perso">Github</a></p>
  <p>Pour la partie <i>Collection</i>, j'utilise l'API d'<a href="https://www.igdb.com/">IGDB.</a></p>
  <p>La structure des sections <i>Textes</i> et <i>Blog</i> en Markdown se base sur <a href="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog">le billet de blog très instructif et pédagogique de Josh Collinsworth.</a></p>
  <p>Le CSS qui génère le rendu papier provient de <a href="https://www.getpapercss.com/">PaperCSS.</a></p>
  <p>L'illustration et l'accueil et les différents éléments graphiques dans les pages ont été dessinés par <a href="https://www.instagram.com/souponavet">Etienne Läderach</a>, un illustrateur suisse.</p>
</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 70px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }

  div {
    padding-bottom: 30px;
  }

  a:link, a:visited {
    color: purple;
  }
</style>