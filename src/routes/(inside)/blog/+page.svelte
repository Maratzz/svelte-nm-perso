<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"

  export let data
  
  let { posts } = data
  let formatDate = (e) => { 
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    return new Date(e).toLocaleDateString( "fr", options )
  }
</script>

<HeadSEO 
  title="Nico Moisson | Blog"
  description="Un blog où on parle de tout et de rien, mais surtout un peu de tout quand même"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<main>
  <h1>Blog</h1>
    
  <ul class="removePaperLi container">
    {#each posts as post}
      <li>
        <div class="item">
          <img
            src="https://placehold.co/140x190"
            alt="Placeholder"
            class="text-img">
          <div class="item__content">
            <h2>
              <a href={post.path}>
                {post.meta.title}
              </a>
            </h2>
            <p>Publié le {formatDate(post.meta.date)}</p>
            <p>{post.meta.headline ?? "Aucune headline"}</p>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style lang="scss">
  main {
    padding-top: 100px;
  }

  h1 {
    position: relative;
    padding-left: 15px;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 60px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 40px;
    }
  }

  .text-img {
    width: 140px;
    height: 190px;
    object-fit: contain;
  }

  .container {
    //border: 1px solid red;
    display: flex;
    flex-flow: column wrap;
    //margin: 0;
    padding: 0;
  }

  .item {
    //border: 1px solid green;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 10px 15px;
    background-color: rgb(255, 255, 255);
    padding: 15px 25px;
    border-radius: 5px;
    &__content {
      margin-left: 25px;
    }
  }

  ul li {
    text-indent: 0;
  }
</style>