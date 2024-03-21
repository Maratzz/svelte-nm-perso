<script>
  export let game
  export let openItem
</script>

<img src={game.cover} alt="Jaquette du jeu {game.name}" class="item-preview" on:click={openItem} on:keypress={openItem}>

<div id="item-modal">
  <img src={game.cover} alt="Jaquette du jeu {game.name}">
  <p>{game.developers}</p>
  <p>Sorti le {game.released_in}</p>
  <p>{game.platform}</p>
  <p>{game.notes}</p>
</div>

<style>
  #item-modal {
    display: none;
    position: absolute;
    top: 0;
  }
</style>