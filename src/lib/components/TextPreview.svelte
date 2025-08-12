<script>
  import { onMount } from "svelte"
  import { formatDate } from "$lib/utils"
  import blockquote_icon from "$lib/assets/icons/blockquote.svg"
  import parchemin from "$lib/assets/inside-pages/parchemin_full.png"
  export let itemName

  let texts = []

  onMount(async () => {
    const response = await fetch(`/api/every-texts`)
    texts = await response.json()
      .then(( data ) => data.filter( post => post.meta.mentions?.includes( itemName.toString() ))
    )
  })
</script>

{#if texts.length}
  {#each texts as text}
  <div class="text">
    <img src={parchemin} alt="Dessin d'un parchemin" class="no-border">
    <p>{text.meta.headline}</p>
  </div>
  {/each}
{/if}


<style lang="scss">
  $height: 90px;
  .text {
    display: flex;
    flex-flow: row nowrap;
    height: fit-content;
    outline: solid 1px red;
    align-items: center;
    position: relative;
    img {
      height: $height;
      width: auto;
      transform: rotate(-110deg);
    }
    p {
      height: $height;
      font-size: 0.8em;
      padding-top: 15px;
      background-color: hsl(270, 23%, 76%);
    }
  }
  @media (width < 400px) {
    .text {
      padding: 10px 0px;
    }
  }
</style>
