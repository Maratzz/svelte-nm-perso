<script>
  export let query
  export let query_name
  export let placeholder
</script>

<label for={query}>{query_name}</label>
<input type="text" id={query} name={query} placeholder={placeholder}>

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