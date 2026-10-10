<script>
  let { query, query_name, value, size, type } = $props()
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