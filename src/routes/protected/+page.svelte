<!-- src/routes/+page.svelte -->
<script>
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<div>
	<div>
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/logging-in?redirect=/`}
			showLinks={false}
		/>
	</div>
</div>
