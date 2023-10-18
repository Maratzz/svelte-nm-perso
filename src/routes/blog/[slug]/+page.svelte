<script>
  export let data;
</script>

<svelte:head>
  <title>{ data.title}</title>
</svelte:head>

<article>
  <h1>{ data.title }</h1>
  <p>Publié le: {data.date} dans {data.categories}</p>
  <svelte:component this={data.content} />
</article>