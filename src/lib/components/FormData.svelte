<script>
  export let query
  export let query_name
  export let value
  export let size
  export let type
</script>

<label for={query}>{query_name}</label>
<input
  {type}
  name={query}
  id={query}
  value={value ?? null}
  {size}>

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