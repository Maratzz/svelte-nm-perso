<script>
  import '$lib/styles/code_formatter.css'
  import '$lib/styles/styles.scss'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'

  export let data

  $: ({ supabase, session } = data);

  onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header/>

{#key data.currentRoute}
  <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    <slot />
  </main>
{/key}
<Footer/>