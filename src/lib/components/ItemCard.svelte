<script>
  export let game
  export let session
  let formatDate = (e) => { 
    let options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
    return new Date(e).toLocaleDateString('fr', options)
  }

  let expandedItem

  
</script>

<div class="item">
    <div class="item__header">
      <img 
        src={game.cover}
        alt="Jaquette du jeu {game.name}"
        class="item__image">
    </div>

    <div class="item__body">
      <div class="item__info js-animatable">
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
  
      <div class="item__notes js-animatable">
        <p>{game.notes}</p>
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
  }

  .item__image {
    cursor: pointer;
  }

  .expanded.item {
    background-color: #ffffff;
    border: 3px solid black;
    position: relative;
    box-sizing: content-box;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  .expanded .item__controls {
    display: block;
    position: absolute;
    right: -20px;
    top: -30px;
  }

  .expanded .item__header {
    margin: 30px 30px 0px 25px;
    padding-bottom: 45px;
    flex-shrink: 0;
  }

  .expanded .item__body {
    display: flex;
    flex-flow: column;
    gap: 35px;
    margin-bottom: 10px;
    opacity: 1;
    height: auto;
    width: auto;
  }

  .expanded .item__notes {
    padding-right: 30px;
    text-align: justify;
  }

  .expanded .item__body, .expanded .item__controls, .expanded .item__notes {
    transition: all 0.5s cubic-bezier(0, 0, 0.21, 1);
  }
</style>