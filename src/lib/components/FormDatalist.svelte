<script lang="ts">
  interface Item {
    slug: string
    name: string
  }
  let { query, query_name, items } : { query : string, query_name: string, items: Item[] } = $props()
</script>

<label for={query}>{query_name}</label>
<input list={query} name={query} >
<datalist id={query}>
  {#each items as item}
  <option value={item.slug ?? item.name}>{item.name}</option>
  {/each}
</datalist>

<style lang="scss">
  label {
    font-size: 0.8em;
    font-style: italic;
    display: inline-block;
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
</style>