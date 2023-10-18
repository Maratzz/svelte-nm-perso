<script>
  export let data
</script>

<svelte:head>
  <title>Blog - Nico Moisson</title>
  <meta name="description" content="Le blog, où on parle de tout, et surtout de rien, mais un peu de tout quand même">
</svelte:head>

<h1>Blog</h1>
  
<ul>
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