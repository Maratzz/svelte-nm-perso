<script>
  import github from "$lib/assets/icons/github.svg"
</script>

<svelte:head>
  <title>Connexion - Nico Moisson</title>
  <meta name="description" content="Page de connexion sur le site de Nico Moisson, pour accéder aux trésors cachés">
</svelte:head>

<div>

  <h1>Connexion</h1>
  <p>Vous n'êtes pas connecté-e</p>
  
  <form  method="POST" action="?/login">
  
    <div id="wrap">
      <img src={github} alt="icône de Github" class="no-border">
      <button>Connexion avec Github</button>
    </div>
  
  </form>

</div>

<style>
  #wrap {
    display: flex;
    gap: 15px;
  }
</style>