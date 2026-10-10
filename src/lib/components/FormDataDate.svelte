<script lang="ts">
  let { query, query_name, value } : { query : string, query_name: string, value: string } = $props()
</script>

<label for={query}>{query_name}</label>
<input type="date" name={query} id={query} value={value ?? null} >

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