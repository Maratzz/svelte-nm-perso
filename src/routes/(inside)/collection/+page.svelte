<script>
  import Item from "$lib/components/Item.svelte"

  export let data

  $: ({ games, categories, status, session, supabase } = data)
  $: itemDetails = []
  $: innerList = []

  let itemOpened = false

  let formatDateYear = ( e ) => { 
    return new Date(e).getFullYear()
  }

  let formatDate = ( e ) => { 
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    return new Date(e).toLocaleDateString( "fr", options )
  }

  let getInfo = async ( game ) => {
    let { data: item } = await supabase
      .from('games')
      .select('*')
      .eq('id', game.id)

    itemDetails = item[0]
    innerList = await getLists(game)
    itemOpened = !itemOpened
  }

  let getLists = async ( e ) => {
    let { data: lists } = await supabase
      .from("games")
      .select(`
        name,
        lists (
          name
        )
      `)
      .eq("name", `${e.name}`)
      .order("name", {ascending: true})
    let itemLists = lists[0].lists
    let innerList = []
    itemLists.forEach(list => 
      innerList.push( list.name )
    )
    return innerList
  }
  
  let closeItem = () => {
    itemOpened = !itemOpened
  }
</script>

<main class={itemOpened ? "dimmed" : ""}>

  <h1>Collection</h1>

  <div class="container">
    {#each games as game}
    <Item {game} getInfo={() => {getInfo( game )}}/>
    {/each}
  </div>

  {#key itemDetails, innerList}
  <div class={itemOpened ? "border border-5 item-opened opened" : "item-opened"}>

    <button on:click={closeItem}>X</button>

    <div id="item-opened__info">

      <img src={itemDetails.cover} alt="Jaquette du jeu {itemDetails.name}" id="info__img">

      <div id="info__inner">
        <p class="info-big"><b>{itemDetails.name}</b></p>
        <p class="info-small"><i>{itemDetails.developers}, {formatDateYear(itemDetails.released_in)}</i></p>
        <p class="info-small">Status: {itemDetails.status}</p>
        {#if itemDetails.status === "finished" && itemDetails.finished_at !== null}
        <p class="info-small">Terminé le {formatDate(itemDetails.finished_at)}</p>
        {:else if  itemDetails.status === "currently playing"}
        <p class="info-small">En cours depuis le {formatDate(itemDetails.started_at)}</p>
        {:else if itemDetails.status === "flushed" && itemDetails.finished_at !== null}
        <p class="info-small">Abandonné le {formatDate(itemDetails.finished_at)}</p>
        {/if}
      </div>

    </div>

    <div id="item-opened__notes">
      {itemDetails.notes}
    </div>

    {#if innerList.length}
    <p id="item-opened__lists">Ce jeu est dans {innerList.length === 1 ? "la liste suivante" : "les listes suivantes"}:</p>
    <ul>
      {#each innerList as list}
      <li>{list}</li>
      {/each}
    </ul>
    {:else}
    <p id="item-opened__lists">Ce jeu n'est dans aucune liste, pour le moment</p>
    {/if}

  </div>
  {/key}

</main>



<style lang="scss">

  main {
    padding-top: 100px;
  }

  .dimmed {
    background-color: rgba($color: #000000, $alpha: 0.8);
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }

  .container {
    display: flex;
    position: relative;
    flex-flow: row wrap;
    gap: 30px;
    justify-content: center;
  }

  .item-opened {
    display: none;
    position: fixed;
    width: 95%;
    height: 85vh;
    overflow: auto;
    top: 100px;
    left: 10px;
    z-index: 15;
    background-color: #eee;
    button {
      position: fixed;
      bottom: 0;
      right: 45%;
    }
  }

  .item-opened.opened {
    display: block;
  }

  #item-opened {
    &__info {
      display: flex;
      flex-flow: row nowrap;
      margin: 25px 10px 10px 10px;
      gap: 15px;
    }
    &__notes, &__lists {
      margin: 25px 10px 0 10px;
    }
  }

  #info__inner {
    p:not(:last-child) {
      margin: 0;
    }
  }

  #info__img {
    width: 30vw;
    height: 100%;
  }

  .info {
    &-big {
      font-size: 1.5em;
      margin: 0 0 10px 0;
    }
    &-small {
      font-size: 0.8em;
    }
  }
</style>