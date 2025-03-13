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

<div>

  <p class="info"><u>Filtrer par catégories</u></p>
  <div class="filter">
    {#each uniqueCategories as category}

      {#if (category) !== categoryToExclude}

        <input type="checkbox" name={category} id={category} value={category} bind:group={selectedCategories} class="inputCheck">
        <label for={category} class="filter__button">{category}</label>

      {/if}

    {/each}
  </div>

</div>

<style lang="scss">
  @use "sass:color";
  $color: hsl(253, 27%, 80%);
  $color-checked: hsl(253, 52%, 65%);

  .info {
    font-size: 0.8em;
    font-style: italic;
  }

  .filter {
    display: flex;
    flex-flow: row wrap;
    gap: 15px;
    justify-content: left;
    padding-left: 0;
    margin-bottom: 50px;
    &__button {
      padding: 5px 10px;
      background-color: $color;
      border-radius: 15px;
      &:hover {
        background-color: color.scale($color, $lightness: 15%);
        box-shadow: 3px 3px 2px 1px #C3BDD9;
        cursor: pointer;
      }
    }
  }

  input {
    display: none;
  }

  .filter input:checked + label {
    background-color: $color-checked;
    &:hover {
      background-color: $color-checked;
    }
  }
</style>