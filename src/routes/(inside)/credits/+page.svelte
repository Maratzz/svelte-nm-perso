<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte";
  import full_image from "$lib/assets/homepage/full_image.webp"
</script>

<HeadSEO 
  title="Nico Moisson | Crédits"
  description="Une liste des ressources et inspirations utilisées pour créer ce site"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Crédits</h1>
  
  <p>Ce site est le mien mais c'est également un effort collectif, comme tout ce qui existe sur Internet. J'aimerais lister ici les auteurs et autrices des ressources et des outils que j'ai utilisés pour monter cet espace. Merci à elles et à eux. N'hésitez pas à voir leur travail et à les soutenir !</p>

  <h2>Technologies</h2>
  <p>Le framework JavaScript qui fait tout tourner derrière est <a href="https://kit.svelte.dev/">SvelteKit</a>, créé par <a href="https://github.com/Rich-Harris">Richard Harris</a> et d'autres <a href="https://github.com/sveltejs/svelte/graphs/contributors">contributeurs et contributrices.</a></p>
  <p>Le site est hebergé sur <a href="https://vercel.com">Vercel.</a>, sur la base d'un repositoire <a href="https://github.com/Maratzz/svelte-nm-perso">Github</a></p>
  <p>Pour la partie <i>Collection</i>, j'utilise les APIs suivantes: <a href="https://www.igdb.com/">IGDB</a>, <a href="https://www.themoviedb.org/">TMDB</a>, <a href="https://anilist.co/">Anilist</a>, ainsi que <a href="https://cheerio.js.org/">la librairie Cheerio</a> pour du scraping occasionnel.</p>
  <p>La structure des sections <i>Textes</i> et <i>Blog</i> en Markdown se base sur <a href="https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog">le billet de blog très instructif et pédagogique de Josh Collinsworth.</a></p>
  <p>Le CSS qui génère le rendu papier provient de <a href="https://www.getpapercss.com/">PaperCSS.</a></p>
  <p>Les icônes ont été créées par <a href="https://github.com/gilbarbara/logos">Gil Barbara.</a></p>

  <h2>Illustrations & palette graphique</h2>
  <p>L'illustration de la page d'accueil et les différents éléments graphiques dans les pages ont été dessinés par <a href="https://www.instagram.com/souponavet">Etienne Läderach</a>, un illustrateur suisse.</p>
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
</style>