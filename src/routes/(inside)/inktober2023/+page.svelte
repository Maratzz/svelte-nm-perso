<script>
  import dream from '$lib/assets/inktober2023/1_dream.pdf'
  import spiders from '$lib/assets/inktober2023/2_spiders.pdf'
  import path from '$lib/assets/inktober2023/3_path.pdf'
  import dodge from '$lib/assets/inktober2023/4_dodge.pdf'
  import map from '$lib/assets/inktober2023/5_map.pdf'
  import golden from '$lib/assets/inktober2023/6_golden.pdf'
  import drip from '$lib/assets/inktober2023/7_Drip.pdf'
  import toad from '$lib/assets/inktober2023/8_Toad.pdf'
  import bounce from '$lib/assets/inktober2023/9_Bounce.pdf'
  import fortune from '$lib/assets/inktober2023/10_fortune.pdf'
  import wander from '$lib/assets/inktober2023/11_wander.pdf'
  import spicey from '$lib/assets/inktober2023/12_spicey.pdf'
  import rise from '$lib/assets/inktober2023/13_rise.pdf'
  import castle from '$lib/assets/inktober2023/14_castle.pdf'
  import dagger from '$lib/assets/inktober2023/15_dagger.pdf'
  import angel from '$lib/assets/inktober2023/16_angel.pdf'
  import demon from '$lib/assets/inktober2023/17_demon.pdf'
  import saddle from '$lib/assets/inktober2023/18_saddle.pdf'
  import plump from '$lib/assets/inktober2023/19_plump.pdf'
  import frost from '$lib/assets/inktober2023/20_frost.pdf'
  import chains from '$lib/assets/inktober2023/21_chains.pdf'
  import saddle_english from '$lib/assets/inktober2023/saddle_english.txt'
  import saddle_mobile from "$lib/assets/inktober2023/saddle_mobile.png"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import MediaQuery from '$lib/components/MediaQuery.svelte'
  import HeadSEO from '$lib/components/HeadSEO.svelte'
</script>

<HeadSEO 
  title="Nico Moisson | Inktober 2023 textes 14 à 20"
  description="Quelques extraits d'un recueil de textes en cours de production'"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
  twitter
  openGraph
/>

<div>
  <h1>Inktober 2023 (Pas de titre pour l'instant)</h1>

  <p class="alert alert-secondary">Voici un aperçu de mon travail d'écriture en cours. A mi-chemin entre critique, poésie et littérature ergodique, j'utilise <a href="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/79397039-375a-44d9-bd12-e5a1fe566c4f/2023promptlist.jpg?format=2500w">chaque mot de l'Inktober 2023</a> comme point de départ pour produire des textes autour de certaines oeuvres vidéoludiques, ou des aspects de cette culture et de cette industrie. J'espère à terme pouvoir compiler les 31 textes dans un recueil disponible à la vente sur ce site, à prix libre. En attendant, bonne lecture ! Vous pouvez ouvrir et/ou télécharger chaque fichier pour les lire sur le navigateur/logiciel de lecture PDF de votre choix.</p>

  <p class="alert alert-primary">🇬🇧 English-speaking readers 🇬🇧, here's a glimpse of the project I'm currently working on. Using the Inktober 2023 words as starting points, I'm writing French texts which are at the intersection of ergodic literature, poetry and criticism, with a good amount of video games on top of it. I hope to release all the pieces later on this very website, in a compilation available for sale on a pay-what-you-want basis to promote my work and hopefully produce something people will enjoy reading and ponder about. At the moment there is only one translation available for Saddle, which got picked up and shared by the good folks over at <a href="https://critical-distance.com/">Critical Distance</a> 🙏🏽 Thanks for reading!</p>

  <ul>
    <li><a href={dream} target="_blank">Jour 1: Dream</a></li>
    <li><a href={spiders} target="_blank">Jour 2: Spiders</a></li>
    <li><a href={path} target="_blank">Jour 3: Path</a></li>
    <li><a href={dodge} target="_blank">Jour 4: Dodge</a></li>
    <li><a href={map} target="_blank">Jour 5: Map</a></li>
    <li><a href={golden} target="_blank">Jour 6: Golden</a></li>
    <li><a href={drip} target="_blank">Jour 7: Drip</a></li>
    <li><a href={toad} target="_blank">Jour 8: Toad</a></li>
    <li><a href={bounce} target="_blank">Jour 9: Bounce</a></li>
    <li><a href={fortune} target="_blank">Jour 10: Fortune</a></li>
    <li><a href={wander} target="_blank">Jour 11: Wander</a></li>
    <li><a href={spicey} target="_blank">Jour 12: Spicey</a></li>
    <li><a href={rise} target="_blank">Jour 13: Rise</a></li>
    <li><a href={castle} target="_blank">Jour 14: Castle</a></li>
    <li><a href={dagger} target="_blank">Jour 15: Dagger</a></li>
    <li><a href={angel} target="_blank">Jour 16: Angel</a></li>
    <li><a href={demon} target="_blank">Jour 17: Demon</a></li>
    <li><a href={saddle} target="_blank">Jour 18: Saddle</a>, <a href={saddle_english}> 🇬🇧 translation</a></li>
    <li><a href={plump} target="_blank">Jour 19: Plump</a></li>
    <li><a href={frost} target="_blank">Jour 20: Frost</a></li>
    <li><a href={chains} target="_blank">Jour 21: Chains</a></li>
  </ul>

  <MediaQuery query="(min-height: 750px) and (min-width: 500px)" let:matches>
    {#if matches}
      <object
        data={saddle}
        type="application/pdf"
        title="Saddle"
        width="100%"
        height="950">
      </object>
    {:else}
      <img src={saddle_mobile} alt="Capture d'écran du texte Saddle">
    {/if}
  </MediaQuery>

</div>

<style>
  div {
    width: 85vw;
  }
</style>