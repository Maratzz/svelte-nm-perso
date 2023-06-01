<script>
  export let data
  const { products } = data
  console.log(data)
</script>

{#each products as product}
   <p>{product.title}: {product.description}</p>
{/each}