<script>
  import { onMount } from "svelte"
  import { formatDate } from "$lib/utils"
  import blockquote_icon from "$lib/assets/icons/blockquote.svg"
  import parchemin from "$lib/assets/inside-pages/parchemin_full.png"
  export let itemName
  export let handleClick = () => {}

  let texts = []

  onMount(async () => {
    const response = await fetch(`/api/every-texts`)
    texts = await response.json()
      .then(( data ) => data.filter( post => post.meta.mentions?.includes( itemName.toString() ))
    )
  })
</script>

{#if texts.length}
  <p>J'ai écrit sur cette oeuvre {texts.length} fois:</p>
  {#each texts as text}
  <div class="text" onclick={() => {handleClick(text)}} onkeypress={() => {handleClick(text)}} role="link" tabindex="0">
    <img src={parchemin} alt="Dessin d'un parchemin" class="no-border">
    <div class="text-content">
      <p>{text.meta.headline}</p>
      <a href={text.path}>En lire plus</a>
    </div>
  </div>
  {/each}
{/if}


<style lang="scss">
  .text {
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
    width: 100%;
    align-items: center;

    &-content {
      font-size: 0.8em;
      position: relative;
      background-color: rgb(255, 255, 255);
      padding: 10px 15px;
      border-radius: 15px;
      &:hover {
        cursor: pointer;
        box-shadow: 6px 6px 2px 1px #C3BDD9;
        transition: all .1s ease-in-out;
      }
      p {
        padding-bottom: 10px;
      }
      a {
        position: absolute;
        bottom: 5px;
        right: 15px;
      }
    }
    img {
      height: 80px;
      width: auto;
    }
  }
</style>
