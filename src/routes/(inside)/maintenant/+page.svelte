<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import { formatDate } from "$lib/utils/index.js"
  

  export let data

  let { maintenant, collectionNow, collectionLastFinished, text, session } = data
  console.log(text)
</script>

<HeadSEO 
  title="Nico Moisson | Maintenant"
  description="Un instantané de l'être multicellulaire qu'on appelle Maratz sur les Internets"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Maintenant</h1>

  <p>À toi qui aimerais savoir ce que je fais en ce moment, où je suis, ce que je deviens, cette page fortement inspirée de l'initiative <a href="https://nownownow.com/about">nownownow</a> rassemble les dernières nouvelles à propos de l'être multicellulaire que je suis et qui continue de naviguer dans le cosmos. Et toi, qu'est-ce que tu deviens ? N'hésite pas à <a href="/contact">m'envoyer de tes nouvelles</a> grâce aux miracles de la technologie moderne.<br/><br/><b>Bises</b>, Nico "Maratz"</p>

  <h2>Or donc, voici les nouvelles</h2>
  <p>J'habite {maintenant.home} et
    {#if maintenant.elsewhere_bool === (true)}
    je suis actuellement {maintenant.location_location}, pour {maintenant.elsewhere_reason}
    {:else}
    je suis actuellement chez moi.
    {/if}
  </p>

  <p>Je gagne des sous en étant {maintenant.jobs}.
    {#if maintenant.webdev_open === (true)}
    J'accepte des nouveaux projets web.
    {:else}
    Je ne suis pas disponible pour des nouveaux projets web.
    {/if}
  </p>

  <p>Mon dernier texte publié est <a href="{text.path}">{text.meta.title}</a>.</p>
  <p>
    {#if maintenant.writing === (null)}
    En ce moment je n'écris pas.
    {:else}
    Je suis en train d'écrire le prochain texte {maintenant.writing}.
    {/if}
  </p>

  {#if session}
    <div id="editForm" class="border border-1">
      <form action="/?update" method="post" id="form_update">
        <FormData query="maintenant_elsewhere_location" query_name="En visite" value={maintenant.elsewhere_location}/>
        <FormData query="maintenant_elsewhere_reason" query_name="Raison" value={maintenant.elsewhere_reason}/>
        <FormData query="maintenant_writing" query_name="Ecriture" value={maintenant.writing}/>
        <FormData query="maintenant_jobs" query_name="Boulot" value={maintenant.jobs}/>
        <FormData query="maintenant_home" query_name="Home" value={maintenant.home}/>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  {/if}

  <h2>Dernières oeuvres en cours</h2>

  <div class="gallery">
  {#each collectionNow as item}
    <a href="/collection/{item.slug}">
      <img src={item.cover} alt="Couverture de l'oeuvre {item.name}">
    </a>
  {/each}
  </div>

  <h2>Dernières oeuvres terminées</h2>

  <div class="gallery">
    {#each collectionLastFinished as item}
      <a href="/collection/{item.slug}">
        <img src={item.cover} alt="Couverture de l'oeuvre {item.name}">
      </a>
    {/each}
  </div>

  <p><i>Page mise à jour le {formatDate(maintenant.updated_at)}.</i></p>

</div>

<style lang="scss">

  .gallery {
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
    justify-content: center;
  }

  img {
    width: 40vw;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
  p:last-child {
    margin-top: 50px;
    font-size: 0.8em;
  }

  @media (min-width: 900px) {
    img {
      width: 10vw;
    }
  }
</style>