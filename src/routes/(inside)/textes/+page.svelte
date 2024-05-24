<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  let { posts, items } = data
  let formatDate = (e) => { 
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    return new Date(e).toLocaleDateString( "fr", options )
  }

  let attachCoverImage = ( target, database ) => {
    let foundRow = database.find( e => e.name === target )
    if ( foundRow === undefined ) {
      return "https://placehold.co/140x190"
    } else {
      let coverImageID = foundRow.cover
      let coverImageString = coverImageID.slice(54)
      let coverImage = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${coverImageString}`
      return coverImage
    }
  }
</script>

<HeadSEO 
  title="Nico Moisson | Textes"
  description="Textes, critiques, poèmes, souvent autour du jeu vidéo, mais pas que."
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<h1>Textes</h1>

<div id="container">

  {#each posts as post}

    <div id="item">

      <img src={post.meta.image ?? attachCoverImage( post.meta.title, items )} alt="Illustration du texte" id="item-img" class="border-2">

      <div id="item-content">
        <h2><a href={post.path}>{post.meta.title}</a></h2>
        <p><i>{formatDate( post.meta.date )}</i></p>
        <p>{post.meta.headline ?? "Pas d'accroche, bouh !"}</p>
      </div>

    </div>
    
  {/each}
</div>

<style lang="scss">
  h1 {
    position: relative;
    padding-left: 15px;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 90px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 50px;
    }
  }

  #container {
    background-color: #eee;
    padding-bottom: 15px;
  }

  #item {
    background-color: rgb(255, 255, 255);
    width: 90%;
    margin: 15px auto 25px auto;
    padding: 15px 15px;
    border-radius: 15px;
    h2 {
      margin-bottom: 0;
    }
    &-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      margin: 0 auto;
    }
  }

  #item-content h2 + p {
    font-size: 0.8em;
    margin-top: 5px;
  }

  @media (min-width: 900px) {
    #item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-evenly;
      width: 50vw;
      padding: 15px 0;
      &-content {
        width: 45%;
      }
      &-img {
        width: 45%;
        height: 200px;
        margin: auto 0;
        object-position: right 40%;
      }
    }
  }
</style>