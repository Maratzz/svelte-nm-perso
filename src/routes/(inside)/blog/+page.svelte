<script>
  import { fade } from "svelte/transition"
  import { goto } from "$app/navigation"
  import { formatDate } from "$lib/utils/index.js"

  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import CategoryList from "$lib/components/CategoryList.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  $: ({ posts } = data)
  $: filteredPosts = posts
  $: selectedCategories = []
  $: console.log("les catégories vues par parent", selectedCategories)

  $: if (selectedCategories.length) {
    filteredPosts = filteredPosts.filter( post => 
    post.meta.categories.includes(`${selectedCategories}`)
  )
    console.log("posts filtrés:", filteredPosts)
  } else {
    filteredPosts = posts
  }
  let handleClick = (post) => {
    const link = post.path
    goto(link)
  }
</script>

<HeadSEO 
  title="Nico Moisson | Blog"
  description="Un blog où on parle de tout et de rien, mais surtout un peu de tout quand même"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Blog</h1>

  <CategoryList {posts} categoryToExclude = "blog" bind:selectedCategories/>

  {#key filteredPosts}
  <div id="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each filteredPosts as post}
    <div class="item" on:click={() => {handleClick(post)}} on:keypress={() => {handleClick(post)}} role="link" tabindex="0">
      <img src={post.meta.image ?? "https://placehold.co/140x190"} alt="Illustration pour le billet de blog" class="item-img border-2">

      <div class="item-content">
        <h2><a href={post.path}>{post.meta.title}</a></h2>
        <p><i>{formatDate( post.meta.date )}</i></p>
        <p>{post.meta.headline ?? "Pas d'accroche, bouh !"}</p>
      </div>
    </div>
    {/each}
  </div>
  {/key}
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
      width: 60px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 30px;
    }
  }

  #container {
    background-color: #eee;
    padding-bottom: 15px;
  }

  .item {
    background-color: rgb(255, 255, 255);
    width: 100%;
    margin: 15px auto 25px auto;
    padding: 15px 15px;
    border-radius: 15px;
    transition: all .1s ease-in-out;
    &:hover {
      cursor: pointer;
      box-shadow: 6px 6px 2px 1px #C3BDD9;
      transition: all .1s ease-in-out;
    }
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

  .item-content h2 + p {
    font-size: 0.8em;
    margin-top: 5px;
  }

  @media (min-width: 900px) {
    .item {
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