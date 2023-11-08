<script>
  export let data
</script>

<svelte:head>
  <title>Textes - Nico Moisson</title>
  <meta name="description" content="Textes, critiques, poèmes, autour du jeu vidéo, mais pas que.">
</svelte:head>

<h1>Textes</h1>
    
<ul class="removePaperLi">
  {#each data.posts as post}
    <li>
      <h2>
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h2>
      Publié le {post.meta.date}
    </li>
  {/each}
</ul>