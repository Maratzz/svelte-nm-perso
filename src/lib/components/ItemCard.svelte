<script>
  import { gsap } from "gsap";
  import { Flip } from "gsap/dist/Flip";
  import { tick } from "svelte";
  gsap.registerPlugin(Flip)

  export let game
  export let session
  export let supabase

  let isOpened
  let innerList = []

  let toggleItemPage = async () => {
    const state = Flip.getState('.item')
    isOpened = !isOpened
    await tick()
    Flip.from(state, {
      targets: '.isOpened.item',
      duration: 0.3,
      ease: "power1.inOut",
      absolute: true
    });
  }

  let fetchLists = async () => {
    innerList = []
    const { data } = await supabase
    .from('games')
    .select(`
      name,
      lists (
        name
      )
    `)
    .eq('name', `${game.name}`)
    .order('name', { ascending: true })
    let lists = data[0].lists
    lists.forEach(list => 
      innerList.push(list.name)
    )
    innerList = innerList
    return innerList
  }

  let formatDate = (e) => { 
    let options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
    return new Date(e).toLocaleDateString('fr', options)
  }
</script>

<div class={isOpened ? 'isOpened item border border-1' : 'item'} on:click={toggleItemPage} on:click={fetchLists} on:keypress={toggleItemPage} on:keypress={fetchLists}>
  <div class="item__header">
    <img 
      src={game.cover}
      alt="Jaquette du jeu {game.name}"
      class="item__image">
  </div>

  <div class="item__body">
    <div class="item__info">
      <h2>{game.name} ({game.platform})</h2>
      <p>{game.developers}</p>
      <p>Sorti le {formatDate(game.released_in)}</p>
      <p>{game.status}</p>
      {#if game.status === 'finished' && game.finished_at !== null}
        <p>Terminé le {formatDate(game.finished_at)}</p>
      {:else if  game.status === 'currently playing'}
        <p>En cours depuis le {formatDate(game.started_at)}</p>
      {:else if game.status === 'flushed' && game.finished_at !== null}
        <p>Abandonné le {formatDate(game.finished_at)}</p>
      {/if}
    </div>

    <div class="item__notes">
      <p>{game.notes}</p>
    </div>

    <div>
      {#if innerList.length}
      <p>Ce jeu est dans les listes suivantes:</p>
        {#each innerList as list}
          <p>{list}</p>
        {/each}
      {:else}
        <p>Ce jeu n'est dans aucune liste, pour le moment</p>
      {/if}
    </div>
  </div>

  <div class="item__controls">
    {#if session}
    <button type="button">Edit</button>
    {/if}
    <button type="button" class="item__close">X</button>
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
  }

  .item__image {
    cursor: pointer;
  }

  .isOpened.item {
    display: flex;
    background-color: #ffffff;
    position: fixed;
    bottom: 30%;
    box-sizing: content-box;
    width: 65%;
    flex-flow: row nowrap;
    z-index: 15;
    padding: 25px 0;
  }

  .isOpened .item__controls {
    display: block;
    position: absolute;
    right: -20px;
    top: -30px;
  }

  .isOpened .item__header {
    margin: 30px 30px 0px 25px;
    padding-bottom: 5px;
    flex-shrink: 0;
  }

  .isOpened .item__body {
    display: flex;
    flex-flow: column;
    gap: 35px;
    margin-bottom: 10px;
    margin-left: 25px;
    opacity: 1;
    height: auto;
    width: auto;
  }

  .isOpened .item__notes {
    padding-right: 30px;
    text-align: justify;
    display: block;
  }
</style>