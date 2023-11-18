<script>
  export let data
  let  { date, title, content, categories } = data
  let options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  let humanDate = new Date(date).toLocaleDateString('fr', options)
</script>

<svelte:head>
  <title>{title} - Nico Moisson</title>
</svelte:head>

<article>
  <h1>{title}</h1>
  <p>Publié le {humanDate} dans {categories.length === 1 ? 'la catégorie' : 'les catégories'}{#each categories as category}<span class="category">{category}</span>{/each}</p>
  <svelte:component this={content} />
</article>

<style>
  .category {
    margin: 0 3px;
    background-color: aquamarine;
    padding: 4px 4px;
  }
</style>