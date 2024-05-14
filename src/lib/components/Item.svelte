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

  @media (min-width: 900px) {
    img {
      width: 20vw;
    }
  }

  @media (min-width: 1500px) {
    img {
      width: 15vw;
    }
  }
</style>