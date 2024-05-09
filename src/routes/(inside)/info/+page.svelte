<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
</script>

<HeadSEO 
  title="Nico Moisson | À propos"
  description="Où êtes-vous ? Qui suis-je ? Que faisons-nous là ?"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<main>
  <h1>À propos</h1>

  <p>Je suis Nico, aussi connu sous le nom de Maratz sur Internet. Depuis tout petit j'ai toujours aimé écrire et créer des univers entre les lignes.</p>

  <p>Alors comme beaucoup de gens de ma génération, j'ai ouvert des blogs à foison, puis je les ai délaissés.</p>

  <p>J'ai créé des pages Tumblr, des profils sur des réseaux sociaux devenus infréquentables, sur des sites avec un sens communautaire, certains déviants, d'autres critiques. J'ai hanté des forums RP, à l'époque où j'apprenais en cours de latin que le pluriel était <i>fora</i> (mais forums ça va très bien aussi, hein)</p>

  <p>Tout ça pour le seul plaisir d'écrire. De coucher des mots sur l'écran. De profiter du pouvoir d'Internet pour s'exprimer, pour laisser libre cours à l'imagination.</p>

  <h2>Écrire, dit-il,</h2>
  <p>Et avant Internet, c'était des feuilles doubles au collège. Des histoires à la pelle, des phrases qui naissent et meurent en heure de perm'.</p>

  <p>Et puis j'ai eu envie d'arrêter de faire le Petit Poucet. D'avoir un espace où je pourrais enfin réunir tout ces morceaux, sans pour autant tout unifier ou uniformiser. Posséder un coin véritablement à moi, loin des conditions d'utilisation de GAFAM, loin de la menace de voir un espace transformé par une <i>bottom line</i> de quelques annonceurs, publicistes, éditeurs, s'accaparant le bien commun du numérique.</p>

  <p>Voià l'origine de ce site.</p>

  <p>Dessus, je parle jeux vidéo, philosophie, décroissance, stoïcisme, shitposts. J'y mets des listes, des collections d'objets que j'aime bien, des billets de blog, des bricolages web, des cartes, des liens, des renvois vers d'autres personnes sympas, et plein d'autres choses. Bref, tout ce que j'aime et que j'ai envie de partager.</p>
  
  <h2>Toujours là ? Okay.</h2>

  <p>Après une formation en linguistique et en littérature, en français et en anglais, j'ai trempé les pieds dans la piscine de la communication et du marketing numérique avant de me rendre compte qu'écrire pour des grands groupes et des marques, bof bof quoi.</p>

  <p>Depuis j'écris et je développe des sites pour des associations, des petites structures et des personnes qui partagent mon avis qu'Internet, c'est d'abord pour tout le monde, et ensuite pour tout le monde, et enfin pour tout le monde.D'ailleurs, si vous voulez collaborer professionnellement, <a href="/site-pro">c'est par ici.</a></p>

</main>

<style lang="scss">
  main {
    padding: 100px 10px 50px 10px;
  }

  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 100px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 40px;
    }
  }
</style>
