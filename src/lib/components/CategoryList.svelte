<script>
  import "papercss/dist/paper.min.css"
  export let posts
  export let categoryToExclude = ''

  export let selectedCategories = []
  let categories = []
  posts.forEach(post => {
    post.meta.categories.forEach(category => {
      categories.push(category)
    })
  })
  let uniqueCategories = [...new Set(categories)]
</script>

<div class="row">
  <div class="collapsible">
    <input id="collapsible5" type="checkbox" name="collapsible">
    <label for="collapsible5">Liste des catégories</label>
    <div class="collapsible-body filter">
      {#each uniqueCategories as category}
          {#if (category) !== categoryToExclude}
            <input type="checkbox" name={category} id={category} value={category} bind:group={selectedCategories}>
            <label for={category}>{category}</label>
          {/if}
        {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @use "sass:color";
  $color: hsl(253, 27%, 80%);
  .filter {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    justify-content: left;
    padding-left: 0;
  }
</style>