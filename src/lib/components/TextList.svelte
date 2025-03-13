<script>
  import "papercss/dist/paper.min.css"
  import { fade } from "svelte/transition"
  export let items, collection
  export let handleClick = () => {}
  export let attachCoverImage = () => {}
  export let formatDate = () => {}
</script>

{#key items}
  <div id="container" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>

    {#if items.length}

      {#each items as item}
      <div class="item" on:click={() => {handleClick(item)}} on:keypress={() => {handleClick(item)}} role="link" tabindex="0">

        <img src={item.meta.image ?? attachCoverImage( item.meta.title, collection )} alt="Illustration du texte" class="item-img border border-2">

        <div class="item-content">
          <h2><a href={item.path} class="link">{item.meta.title}</a></h2>
          <p><i>{formatDate( item.meta.date )}</i></p>
          <p>{item.meta.headline ?? "Pas d'accroche, bouh !"}</p>
        </div>

      </div>
      {/each}

    {:else}
      <p>😥 On dirait qu'il n'y a aucun résultat avec cette sélection de catégories. Modifie la sélection.</p>
    {/if}
  </div>
  {/key}

<style lang="scss">
  #container {
    background-color: #eee;
    padding-bottom: 15px;
  }

  .item {
  background-color: rgb(255, 255, 255);
  width: 100%;
  margin: 15px auto 25px auto;
  padding: 15px 15px;
  border-radius: 15px;
  transition: all .1s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 6px 6px 2px 1px #C3BDD9;
    transition: all .1s ease-in-out;
  }
  h2 {
    margin-bottom: 0;
  }
  &-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin: 0 auto;
  }
}

.item-content h2 + p {
  font-size: 0.8em;
  margin-top: 5px;
}

@media (min-width: 900px) {
  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    width: 50vw;
    padding: 15px 0;
    &-content {
      width: 45%;
    }
    &-img {
      width: 45%;
      height: 200px;
      margin: auto 0;
      object-position: right 40%;
    }
  }
}
</style>
