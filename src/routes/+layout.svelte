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

<svelte:head>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1">
  <link rel="manifest" href="/site.webmanifest?v=1">
  <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#ac6ede">
  <link rel="shortcut icon" href="/favicon.ico?v=1">
  <meta name="msapplication-TileColor" content="#e7f7ff">
  <meta name="theme-color" content="#ffffff">
</svelte:head>

{#key currentRoute}
<div in:fly={transitionIn} out:fly={transitionOut}>
    <slot />
</div>
{/key}