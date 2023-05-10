<script>
  export let data
  </script>
  
  <h1>Textes</h1>
    
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