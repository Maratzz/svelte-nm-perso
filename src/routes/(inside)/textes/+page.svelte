<script>
  import { goto } from "$app/navigation"
  import { formatDate, multiFilteringText } from "$lib/utils/index.js"

  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import TextList from "$lib/components/TextList.svelte"
  import CategoryList from "$lib/components/CategoryList.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  export let data

  $: ({ posts, items } = data)
  $: filteredPosts = posts
  $: selectedCategories = []

  $: if (selectedCategories.length) {
    filteredPosts = []
    filteredPosts = multiFilteringText(posts, selectedCategories)
  } else {
    filteredPosts = posts
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

  let handleClick = ( post ) => {
    const link = post.path
    goto(link)
  }
</script>

<HeadSEO
  title="Nico Moisson | Textes"
  description="Textes, critiques, poèmes, souvent autour du jeu vidéo, mais pas que."
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL={full_image}
  twitter
  openGraph
/>

<div>
  <h1>Textes</h1>

  <CategoryList {posts} categoryToExclude = "textes" bind:selectedCategories/>

  <TextList items={filteredPosts} collection={items} {handleClick} {attachCoverImage} {formatDate}/>
</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    margin-bottom: 80px;
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
</style>