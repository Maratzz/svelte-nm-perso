<script>
  export let categories
  export let selectedCategories = []
</script>

<div class="filter" id="filter">

  {#if categories.length}
    {#each categories as category}
    <input type="checkbox" name={category.name ?? category} id={category.name ?? category} value={category.name ?? category} bind:group={selectedCategories}>
    <label for={category.name ?? category } class="filter__button">{category.name ?? category}</label>
    {/each}
  {/if}

</div>

<style lang="scss">
  @use "sass:color";
  $color: hsl(253, 27%, 80%);
  $color-checked: hsl(253, 52%, 65%);

  .filter {
    display: flex;
    flex-flow: row wrap;
    gap: 15px;
    justify-content: left;
    padding-left: 0;
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