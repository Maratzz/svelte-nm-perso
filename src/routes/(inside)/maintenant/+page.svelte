<script>
  import { onMount } from "svelte"
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import FormData from "$lib/components/FormData.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import { formatDate } from "$lib/utils/index.js"
  import { url } from "$lib/config.js"

  export let data

  let { maintenant, collectionNow, collectionLastFinished, text, session } = data

  onMount(() => {
    if ( session ) {
      const modalEdit = document.getElementById("editForm")
      const modalOpenButton = document.getElementById("openModal")
      modalOpenButton.addEventListener("click", () => {
        modalEdit.style.visibility = "visible"
      })
    }
  })
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

  <p>À toi qui aimerais savoir ce que je fais en ce moment, où je suis, ce que je deviens, cette page fortement inspirée de l'initiative <a href="https://nownownow.com/about">nownownow</a> rassemble les dernières nouvelles à propos de l'être multicellulaire que je suis et qui continue de naviguer dans le cosmos.</p>

  <h2>Or donc, voici les nouvelles</h2>
  <p>J'habite <br/>
    <span class="whitespace">
      <s>
        à Villeurbanne<br/>
        à Saint-Julien-en-Genevois<br/>
        en Suisse<br/>
      </s>
    </span> {maintenant.home} et
    {#if maintenant.elsewhere_bool === (true)}
    je suis actuellement {maintenant.elsewhere_location}, pour {maintenant.elsewhere_reason}
    {:else}
    je suis actuellement chez moi, avec <a href="https://oriane.ink/">Oriane</a> et <a href="{url}/blog/suashem_pc.jpg">Suashem</a>.
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
  <p>Je gagne des sous en étant<br/>
    <span class="whitespace">
      <s>
        animateur numérique<br/>
        surveillant d'examens<br/>
        employé de magasin alimentaire<br/>
      </s>
    </span> {maintenant.jobs}.
    <br/>
    <br>
    Je suis aussi développeur web à mon compte,
    {#if maintenant.webdev_open === (true)}
    et j'accepte actuellement des nouveaux projets, <a href="https://nicolasmoisson.pro">par ici</a>.
    {:else}
    mais je ne suis pas disponible pour des nouveaux projets.
    {/if}
  </p>

  {#if session}

    <button id="openModal">Editer</button>
    <div id="editForm" class="border border-1">
      <form action="?/update" method="post" id="form_update">
        <FormData query="maintenant_elsewhere_location" query_name="En visite" value={maintenant.elsewhere_location}/>
        <FormData query="maintenant_elsewhere_reason" query_name="Raison" value={maintenant.elsewhere_reason}/>
        <FormData query="maintenant_writing" query_name="Ecriture" value={maintenant.writing}/>
        <FormData query="maintenant_jobs" query_name="Boulot" value={maintenant.jobs}/>
        <FormData query="maintenant_home" query_name="Home" value={maintenant.home ?? null}/>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  {/if}

  <p>En ce moment j'explore ces oeuvres</p>

  <div class="gallery">
  {#each collectionNow as item}
    <a href="/collection/{item.slug}">
      <img src={item.cover} alt="Couverture de l'oeuvre {item.name}">
    </a>
  {/each}
  </div>

  <p>et je viens de terminer celles-là, si tu veux en discuter, c'est encore tout frais dans ma tête</p>

  <div class="gallery">
    {#each collectionLastFinished as item}
      <a href="/collection/{item.slug}">
        <img src={item.cover} alt="Couverture de l'oeuvre {item.name}">
      </a>
    {/each}
  </div>
  <br/>
  <p>Et toi, qu'est-ce que tu deviens ? N'hésite pas à <a href="/contact">m'envoyer de tes nouvelles</a> grâce aux miracles de la technologie moderne.<br/><br/><b>Bises</b>, Nico "Maratz"</p>

  <p><i>Page mise à jour le {formatDate(maintenant.updated_at)}.</i></p>

</div>

<style lang="scss">

h1 {
  z-index: 2;
  position: relative;
  &::after {
    z-index: -1;
    display: inline-block;
    content: "";
    background-color: #C3BDD9;
    width: 140px;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 70px;
  }
}

  .whitespace {
    font-size: 0.8em;
  }
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

  #editForm {
    visibility: hidden;
    position: fixed;
    top: 100px;
    left: 10px;
    padding: 15px 45px;
    z-index: 10;
    background-color: white;
    transition: all .3s ease-in-out;
  }

  @media (min-width: 900px) {
    img {
      width: 10vw;
    }
  }
</style>