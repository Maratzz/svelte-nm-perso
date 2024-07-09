<script>
	import { Auth } from "@supabase/auth-ui-svelte"

	export let data
</script>

<svelte:head>
  <title>Connexion - Nico Moisson</title>
  <meta name="description" content="Page de connexion sur le site de Nico Moisson, pour accéder aux trésors cachés">
</svelte:head>

<div>
  <h1>Connexion</h1>
  <p>Vous n'êtes pas connecté·e</p>
  <div>
	  <div>
      <Auth
      supabaseClient={data.supabase}
      providers={[ "github" ]}
      onlyThirdPartyProviders
      />
	  </div>
  </div>
</div>