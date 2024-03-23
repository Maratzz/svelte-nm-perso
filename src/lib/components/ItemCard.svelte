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
</script>

<div class="item border border-2 js-item">

  <div class="item__content">

    <div class="item__controls">
      {#if session}
      <button type="button" class="js-edit">Edit</button>
      {/if}
      <button type="button" class="card__close js-close-button">X</button>
    </div>

    <div class="item__header">

      <img 
        src={game.cover}
        alt="Jaquette du jeu {game.name}"
        class="item__image js-animatable no-border">

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



  </div>

</div>

<style>
  .item {
    width: 100%;
    background-color: #ffffff;
    border: 3px solid black;
    position: relative;
    box-sizing: content-box;
  }

  .item__controls {
      position: absolute;
      right: 15px;
      top: 10px;
  }

  .item__content {
    display: flex;
    flex-direction: row;
  }

  .item__header {
    margin: 30px 30px 0px 25px;
    padding-bottom: 45px;
    flex-shrink: 0;
  }

  .item__body {
    display: flex;
    flex-flow: column;
    gap: 35px;
    margin-bottom: 10px;
  }

  .item__notes {
    padding-right: 30px;
    text-align: justify;
  }
</style>