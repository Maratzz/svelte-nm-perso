<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"

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
      let coverImage = foundRow.cover
      return coverImage
    }
  }
</script>

<HeadSEO 
  title="Nico Moisson | Textes"
  description="Textes, critiques, poèmes, souvent autour du jeu vidéo, mais pas que."
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>


<div id="main">
  <h1>Textes</h1>

  <div id="container">
  
    {#each posts as post}
  
      <div id="item">
  
        <img src={attachCoverImage( post.meta.title, items )} alt="Illustration du texte" id="item-img" class="border-2">
  
        <div id="item-content">
          <h2><a href={post.path}>{post.meta.title}</a></h2>
          <p>Publié le {formatDate( post.meta.date )}</p>
          <p>{post.meta.headline ?? "Pas d'accroche, bouh !"}</p>
        </div>
  
      </div>
      
    {/each}
  </div>
</div>


<style lang="scss">
  #main h1 {
      text-align: center;
    }

  #container {
    background-color: #eee;
  }

  #item {
    background-color: rgb(255, 255, 255);
    width: 90%;
    margin: 15px auto 25px auto;
    padding: 15px 15px;
    border-radius: 15px;
    &-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      margin: 0 auto;
    }
  }

  @media (width >= 900px) {
    #main {
      width: 65%;
      margin: 150px auto 0 auto;
    }

    #item {
      display: flex;
      flex-flow: row nowrap;
      &-content {
        width: 45%;
      }
      &-img {
        width: 45%;
        height: 200px;
        margin: auto auto;
        object-position: right 40%;
      }
    }
  }
</style>