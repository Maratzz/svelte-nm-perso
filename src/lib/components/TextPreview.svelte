<script>
  import { onMount } from "svelte"
  export let itemName

  let texts = []

  onMount(async () => {
    const response = await fetch(`/api/every-texts`)
    texts = await response.json()
      .then(( data ) => data.filter( post => post.meta.mentions?.includes( itemName ))
    )
  })
</script>

{#each texts as text}
<div class="text">
  <blockquote>{text.meta.headline}</blockquote>
</div>
{/each}

<style lang="scss">
  .text {
    background-color: #ffffff;
    padding: 10px 25px;
    border: solid 1px black
  }
</style>
