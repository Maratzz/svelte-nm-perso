<script>
  import saddle from '$lib/assets/inktober2023/saddle.pdf'
  import saddle_english from '$lib/assets/inktober2023/saddle_english.txt'
  import full_image from "$lib/assets/homepage/full_image.webp"
  import MediaQuery from '$lib/components/MediaQuery.svelte'
  import HeadSEO from '$lib/components/HeadSEO.svelte'
</script>

<HeadSEO 
  title="Nico Moisson | Saddle - Inktober 2023"
  description="Un extrait du futur recueil de textes que je prépare"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Saddle</h1>

  <p class="alert alert-secondary">Voici un aperçu de mon travail d'écriture en cours. A mi-chemin entre critique, poésie et littérature ergodique, j'utilise <a href="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/79397039-375a-44d9-bd12-e5a1fe566c4f/2023promptlist.jpg?format=2500w">chaque mot de l'Inktober 2023</a> comme point de départ pour produire des textes autour de certaines oeuvres vidéoludiques, ou des aspects de cette culture et de cette industrie. J'espère à terme pouvoir compiler les 31 textes dans un recueil disponible à la vente sur ce site, à prix libre. En attendant, bonne lecture !</p>

  <p class="alert alert-primary">🇬🇧 English-speaking readers 🇬🇧, you can download <a href={saddle_english} download>the translated script right here</a> to follow along. I did my best to convey most of the meaning, but some may have been lost in translation 🙏🏽 Thanks for reading!</p>

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
      <p class="mobile">Téléchargez le PDF <a href={saddle} download>en cliquant juste ici</a> et ouvrez-le avec l'application de votre choix sur téléphone</p>
    {/if}
  </MediaQuery>

</div>

<style>

  div {
    width: 85vw;
  }
  
  .mobile {
    margin-top: 55px;
  }
</style>