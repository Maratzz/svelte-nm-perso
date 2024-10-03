<script>
  export let data

  let { listes } = data

</script>

<div>

  <h1>Listes</h1>

  {#each listes as liste}
    <a href="/listes/{liste.slug}">{liste.name}</a>
  {/each}
  
</div>

<style>
  a {
    display: block;
  }
</style>