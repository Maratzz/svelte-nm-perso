<script>
  export let session
  export let currentRoute
  let className
  export { className as class}
</script>

<nav class={className}>
  <ul class='removePaperLi'>
    {#if currentRoute !== '/'}
      <li><a href="/">Accueil</a></li>
    {/if}
    <li><a href="/textes">Textes</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/collection">Collection</a></li>
    <li><a href="/info">Info</a></li>
    {#if session}
      <li><a href="/todo">Todo list</a></li>
    {/if}
    <li>
      <a href="/protected">
        {#if !session}
          Connexion
        {:else}
          Mon compte
        {/if}
      </a>
    </li>
  </ul>
</nav>