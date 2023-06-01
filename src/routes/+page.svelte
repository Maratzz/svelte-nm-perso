<script>
  export let data
</script>

<h1>Bienvenue</h1>

<p>Un site en construction, pour découvrir Svelte, SvelteKit et toutes les nouvelles technologies <i>des cool kids</i>.</p>
<p>Chaque étape sera documentée, d'abord pour me faire des notes futures et ensuite parce que j'en ai marre de toujours tomber sur de la documentation obsolète, incorrecte ou tout simplement inutilisable, surtout quand ça concerne les frameworks des <i>cool kids</i>, qui sont cool mais apparemment pas suffisamment cool pour prendre le temps de documenter leurs nouveaux jouets.</p>
<p>En faisant ça je m'exclue peut-être d'office du club des <i>cool kids</i>. C'est okay. J'ai toujours préféré être <i>hot</i> en fait.</p>

{#if data.session}
   <p>Bravo, tu es connecté·e sur Supabase!</p>
{:else}
  <p>Oh non, tu n'es pas connecté·e!</p>
{/if}