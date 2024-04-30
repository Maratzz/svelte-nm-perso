<script>
  import { gsap } from "gsap";
  import { Flip } from "gsap/dist/Flip";
  import { tick } from "svelte";
  gsap.registerPlugin( Flip )

  export let game
  export let session
  export let supabase
  export let onEdit = () => {}

  let isOpened
  let innerList = []

  let toggleItemPage = async () => {
    const state = Flip.getState(".item")
    isOpened = !isOpened
    await tick()
    Flip.from(state, {
      targets: ".isOpened.item",
      duration: 0.3,
      ease: "power1.inOut",
      absolute: true
    });
  }

  let fetchLists = async () => {
    innerList = []
    const { data } = await supabase
    .from("games")
    .select(`
      name,
      lists (
        name
      )
    `)
    .eq("name", `${game.name}`)
    .order("name", {ascending: true})

    let lists = data[0].lists
    lists.forEach(list => 
      innerList.push( list.name )
    )
    innerList = innerList
    return innerList
  }

  let formatDate = (e) => { 
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    return new Date(e).toLocaleDateString( "fr", options )
  }
</script>

<div class={isOpened ? "isOpened item border border-1" : "item"}>

  <div class="item__header">
    <img 
      src={game.cover}
      alt="Jaquette du jeu {game.name}"
      class="item__image"
      on:click={toggleItemPage}
      on:click={fetchLists}
      on:keypress={toggleItemPage}
      on:keypress={fetchLists}>
  </div>

  <div class="item__body">

    <div class="item__info">
      <h2>{game.name} ({game.platform})</h2>
      <p>{game.developers}</p>
      <p>Sorti le {formatDate(game.released_in)}</p>
      <p>{game.status}</p>
      {#if game.status === "finished" && game.finished_at !== null}
        <p>Terminé le {formatDate(game.finished_at)}</p>
      {:else if  game.status === "currently playing"}
        <p>En cours depuis le {formatDate(game.started_at)}</p>
      {:else if game.status === "flushed" && game.finished_at !== null}
        <p>Abandonné le {formatDate(game.finished_at)}</p>
      {/if}
    </div>

    <div class="item__notes">
      <p>{game.notes}</p>
    </div>

    <div class="item__lists">
      {#if innerList.length}
      <p>Ce jeu est dans {innerList.length === 1 ? "la liste suivante" : "les listes suivantes"}:</p>
      <ul>
        {#each innerList as list}
        <li>{list}</li>
        {/each}
      </ul>
      {:else}
        <p>Ce jeu n'est dans aucune liste, pour le moment</p>
      {/if}
    </div>

  </div>

  <div class="item__controls">
    {#if session}
    <button type="button" on:click={onEdit}>Edit</button>
    {/if}
    <button type="button" class="item__close" on:click={toggleItemPage} on:keypress={toggleItemPage}>X</button>
  </div>
  
</div>

<style>
  .item__body, .item__controls, .item__notes {
    display: none;
  }

  .item {
    width: auto;
    z-index: 1;
    position: relative;
    display: flex;
    flex-flow: column wrap;
  }

  .item__image {
    cursor: pointer;
    width: 150px;
    margin: 10px auto;
  }

  .isOpened.item {
/*     display: flex;
    flex-flow: column wrap; */
    background-color: #ffffff;
    position: fixed;
    top: 10%;
    box-sizing: content-box;
    width: 70vw;
    height: 50vh;
    overflow-y: auto;
    z-index: 15;
    padding: 0 10px;
  }

  .isOpened .item__controls {
    display: block;
    position: absolute;
    right: -20px;
    top: -30px;
  }

  .isOpened .item__header {
    padding-bottom: 5px;
    flex-shrink: 0;
  }

  .isOpened .item__body {
    display: flex;
    flex-flow: column;
    gap: 35px;
    opacity: 1;
    height: auto;
    width: auto;
  }

  .isOpened .item__info {
    line-height: 0.6;
  }

  .isOpened .item__notes {
    text-align: justify;
    display: block;
    overflow-y: auto;
  }
</style>