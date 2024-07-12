<script>
	export let data

  const { supabase } = data

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
</script>

<svelte:head>
  <title>Connexion - Nico Moisson</title>
  <meta name="description" content="Page de connexion sur le site de Nico Moisson, pour accéder aux trésors cachés">
</svelte:head>

<div>
  <h1>Connexion</h1>
  <p>Vous n'êtes pas connecté·e</p>
  <button on:click={signInWithGithub}>Connexion avec Github</button>
</div>