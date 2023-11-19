<script>
  import bag from '$lib/assets/homepage/bag.png'
  import background from '$lib/assets/homepage/background.png'
  import bao_out from '$lib/assets/homepage/bao_out.png'
  import bourses from '$lib/assets/homepage/bourses.png'
  import coin_1 from '$lib/assets/homepage/coin_1.png'
  import coin_2 from '$lib/assets/homepage/coin_2.png'
  import coin_3 from '$lib/assets/homepage/coin_3.png'
  import couvercle_bao from '$lib/assets/homepage/couvercle_bao.png'
  import feather from '$lib/assets/homepage/feather.png'
  import flag from '$lib/assets/homepage/flag.png'
  import lanterne_left from '$lib/assets/homepage/lanterne_left.png'
  import lanterne_right from '$lib/assets/homepage/lanterne_right.png'
  import nico from '$lib/assets/homepage/nico.png'
  import parchemin from '$lib/assets/homepage/parchemin.png'
  import poele from '$lib/assets/homepage/poele.png'
  import pot_tournesol from '$lib/assets/homepage/pot_tournesol.png'
  import potion from '$lib/assets/homepage/potion.png'
  import tournesol_bouture from '$lib/assets/homepage/tournesol_bouture.png'
  import tournesol_left from '$lib/assets/homepage/tournesol_left.png'
  import tournesol_middle from '$lib/assets/homepage/tournesol_middle.png'
  import tournesol_right from '$lib/assets/homepage/tournesol_right.png'
</script>

<svelte:head>
  <title>Accueil - Nico Moisson</title>
  <meta name="description" content="Site personnel de Nico, aka Maratz">
</svelte:head>

<h1>Bienvenue</h1>

<p>Un site en construction, pour découvrir Svelte, SvelteKit et toutes les nouvelles technologies <i>des cool kids</i>.</p>
<p>Chaque étape sera documentée, d'abord pour me faire des notes futures et ensuite parce que j'en ai marre de toujours tomber sur de la documentation obsolète, incorrecte ou tout simplement inutilisable, surtout quand ça concerne les frameworks des <i>cool kids</i>, qui sont cool mais apparemment pas suffisamment cool pour prendre le temps de documenter leurs nouveaux jouets.</p>
<p>En faisant ça je m'exclue peut-être d'office du club des <i>cool kids</i>. C'est okay. J'ai toujours préféré être <i>hot</i> en fait.</p>

<div id="homepage">
  <img src={background} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-background">
  <img src={bag} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-bag">
  <img src={bao_out} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-bao-out">
  <img src={bourses} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-bourses">
  <img src={coin_1} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-1">
  <img src={coin_2} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-2">
  <img src={coin_3} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-coin-3">
  <img src={couvercle_bao} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-couvercle-bao">
  <img src={feather} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-feather">
  <img src={flag} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-flag">
  <img src={lanterne_left} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-lanterne-left">
  <img src={lanterne_right} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-lanterne-right">
  <img src={nico} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-nico">
  <img src={parchemin} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-parchemin">
  <img src={poele} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-poele">
  <img src={pot_tournesol} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-pot-tournesol">
  <img src={potion} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-potion">
  <img src={tournesol_bouture} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-bouture">
  <img src={tournesol_left} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-left">
  <img src={tournesol_middle} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-middle">
  <img src={tournesol_right} alt="Elément de l'illusration de page d'accueil" class="no-border" id="homepage-tournesol-right">
</div>

<style lang='scss'>
  #homepage {
    position: relative;
    & img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
