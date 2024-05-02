<script>
  export let game
  export let getInfo = () => {}
</script>

<img src={game.cover} alt="Jaquette du jeu {game.name}" id={game.id} on:click={getInfo} on:keypress={getInfo}>

<style>
  img {
    cursor: pointer;
    width: 40vw;
    height: auto;
    position: relative;
  }
</style>