<script>
  export let query
  export let query_name
  export let placeholder
  export let value
</script>

<label for={query}>{query_name}</label>
<input type="text" name={query} id={query} placeholder={placeholder} value={value ?? null}>

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