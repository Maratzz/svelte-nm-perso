<script>
  import '$lib/styles/code_formatter.css'
  import 'papercss/dist/paper.min.css'
  import '$lib/styles/styles.scss'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'
  import { fly } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'

  export let data

  $: ({ supabase, session, currentRoute } = data)

  const duration = 300
	const delay = duration + 100
	const y = 10

	const transitionIn = { easing: cubicOut, y, duration, delay }
	const transitionOut = { easing: cubicIn, y: -y, duration }
  
  // create an event listener which monitors supabase functions triggered in children pages
  onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header {session}/>

{#key currentRoute}
  <main in:fly={transitionIn} out:fly={transitionOut}>
    <slot />
  </main>
{/key}
<Footer/>