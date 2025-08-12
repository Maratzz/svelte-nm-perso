<script>
  import { goto } from "$app/navigation"
  import { formatDate, multiFilteringText } from "$lib/utils/index.js"

  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import TextList from "$lib/components/TextList.svelte"
  import CategoryList from "$lib/components/CategoryList.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  $: ({ posts } = data)
  $: filteredPosts = posts
  $: selectedCategories = []

  $: if (selectedCategories.length) {
    filteredPosts = []
    filteredPosts = multiFilteringText(posts, selectedCategories)
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
  imageURL={full_image}
  twitter
  openGraph
/>

<div>
  <h1>Blog</h1>

  <CategoryList {posts} categoryToExclude = "blog" bind:selectedCategories/>

  <TextList items={filteredPosts} {handleClick} {formatDate}/>
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
</style>