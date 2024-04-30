<script>
  import Item from "$lib/components/Item.svelte"

  export let data

  $: ({ games, categories, status, session, supabase } = data)
  $: itemDetails = []
  $: innerList = []

  let itemOpened = false

  let formatDate = (e) => { 
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

<h1>Collection</h1>

<div class="container">
  {#each games as game}
  <Item {game} getInfo={() => {getInfo( game )}}/>
  {/each}
</div>

{#key itemDetails, innerList}
<div class={itemOpened ? "border border-5 item-opened opened" : "item-opened"}>

  <div id="item-opened__info">

    <img src={itemDetails.cover} alt="">

    <div>
      <p>{itemDetails.name}</p>
      <p>{itemDetails.developers}</p>
      <p>Sorti le {formatDate(itemDetails.released_in)}</p>
      <p>{itemDetails.status}</p>
    </div>

  </div>

  <div id="item-opened__content">
    {#if itemDetails.status === "finished" && itemDetails.finished_at !== null}
    <p>Terminé le {formatDate(itemDetails.finished_at)}</p>
    {:else if  itemDetails.status === "currently playing"}
    <p>En cours depuis le {formatDate(itemDetails.started_at)}</p>
    {:else if itemDetails.status === "flushed" && itemDetails.finished_at !== null}
    <p>Abandonné le {formatDate(itemDetails.finished_at)}</p>
    {/if}

    {#if innerList.length}
    <p id="item-opened__list">Ce jeu est dans {innerList.length === 1 ? "la liste suivante" : "les listes suivantes"}:</p>
    <ul>
      {#each innerList as list}
      <li>{list}</li>
      {/each}
    </ul>
    {:else}
    <p id="item-opened__list">Ce jeu n'est dans aucune liste, pour le moment</p>
    {/if}
  </div>

  <div id="item-opened__notes">
    {itemDetails.notes}
  </div>


  

  <button on:click={closeItem}>X</button>
</div>
{/key}

<style lang="scss">
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
    top: 100px;
    z-index: 15;
    background-color: #eee;
    button {
      position: absolute;
      top: -20px;
      right: -20px;
    }
    img {
      width: 45%;
      height: auto;
    }
  }

  .item-opened.opened {
    display: block;
  }

  #item-opened {
    &__info {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }
    &__list, &__content {
      margin-top: 15px;
      margin-left: 20px;
      margin-right: 10px;
    }
    &__notes {
      background-color: pink;
    }
  }
</style>