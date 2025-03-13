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
            <input type="checkbox" name={category} id={category} value={category} bind:group={selectedCategories} class="inputCheck">
            <label for={category} class="filter__button border border-2">{category}</label>
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
    gap: 15px;
    justify-content: left;
    padding-left: 0;
    &__button {
      padding: 5px 10px;
      background-color: $color;
      &:hover {
        background-color: color.scale($color, $lightness: 15%);
      }
    }
  }

  input {
    display: none;
  }

  .filter input:checked + label {
    background-color: green;
    &:hover {
      background-color: green;
    }
  }
</style>