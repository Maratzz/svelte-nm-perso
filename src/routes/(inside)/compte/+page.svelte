<!-- src/routes/account/+page.svelte -->
<script>
	import { enhance } from '$app/forms'
  import HeadSEO from '$lib/components/HeadSEO.svelte'
  export let data;
	export let form;

	let { session, supabase, profile } = data

  let profileForm;
	let loading = false;
	let fullName = profile?.full_name ?? ''
	let username = profile?.username ?? ''
	let website = profile?.website ?? ''
	let avatarUrl = profile?.avatar_url ?? ''

	function handleSubmit() {
		loading = true
		return async () => {
			loading = false
		}
	}

	function handleSignOut() {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>

<HeadSEO 
  title="Nico Moisson | Compte"
  description="Page de connexion pour du contenu supplémentaire"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  index = false
/>

<div>
	<form
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="fullName">Nom complet</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="username">Pseudo</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div>
			<label for="website">Site web</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<input
				type="submit"
				value={loading ? 'Chargement...' : 'Mettre à jour'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button disabled={loading}>Déconnexion</button>
		</div>
	</form>
</div>
