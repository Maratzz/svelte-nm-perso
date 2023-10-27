<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title} - Nico Moisson</title>
</svelte:head>

<article>
  <h1>{data.title}</h1>
  <p>Publié le {data.date} dans la catégorie {data.categories}</p>
  <svelte:component this={data.content} />
</article>