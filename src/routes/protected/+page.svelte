<script>
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
</script>

<h1>Mon compte</h1>
<p>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <span
        style="background-image: url('{$page.data.session.user.image}')"
        class="avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Connecté·e en tant que</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button on:click={() => signOut()} class="button">Déconnexion</button>
  {:else}
    <span class="notSignedInText">Tu n'es pas connecté·e</span>
    <button on:click={() => signIn("github")}>Connexion avec GitHub</button>
  {/if}
</p>