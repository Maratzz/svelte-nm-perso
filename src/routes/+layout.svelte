<script>
  import "$lib/styles/code_formatter.css"
  import "papercss/dist/paper.min.css"
  import "$lib/styles/styles.scss"
  import { onMount } from "svelte"
  import { invalidate } from "$app/navigation"
  import { fly } from "svelte/transition"
	import { cubicIn, cubicOut } from "svelte/easing"

  export let data

  let { supabase, session, currentRoute } = data
  $: ({ supabase, session, currentRoute } = data )

  const duration = 300
	const delay = duration + 100
	const y = 10

	const transitionIn = { easing: cubicOut, y, duration, delay }
	const transitionOut = { easing: cubicIn, y: -y, duration }

  onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="Nico" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{#key currentRoute }
<div in:fly={transitionIn} out:fly={transitionOut}>
  <slot />
</div>
{/key}