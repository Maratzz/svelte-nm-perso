<!-- src/routes/+page.svelte -->
<script>
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<h1>Connexion</h1>
<p>Vous n'êtes pas connecté·e</p>
<div>
	<div>
    <Auth
      supabaseClient={data.supabase}
      providers={['github']}
      onlyThirdPartyProviders
    />
	</div>
</div>
