<script>
  export let data
  let { posts } = data
  let formatDate = (e) => { 
    let options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
    return new Date(e).toLocaleDateString('fr', options)
  }
</script>

<svelte:head>
  <title>Blog - Nico Moisson</title>
  <meta name="description" content="Le blog, où on parle de tout, et surtout de rien, mais un peu de tout quand même">
</svelte:head>

<h1>Blog</h1>
  
<ul class="removePaperLi container">
  {#each posts as post}
    <li>
      <div class="item">
        <img
          src="https://placehold.co/140x190"
          alt="Placeholder"
          class="text-img">
        <div class="item__content">
          <h2>
            <a href={post.path}>
              {post.meta.title}
            </a>
          </h2>
          <p>Publié le {formatDate(post.meta.date)}</p>
          <p>{post.meta.headline ?? 'Aucune headline'}</p>
        </div>
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
  .text-img {
    width: 140px;
    height: 190px;
    object-fit: contain;
  }

  .container {
    //border: 1px solid red;
    display: flex;
    flex-flow: column wrap;
    margin: 0;
    padding: 0;
  }

  .item {
    //border: 1px solid green;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 10px 15px;
    background-color: rgb(255, 255, 255);
    padding: 15px 25px;
    border-radius: 5px;
    &__content {
      margin-left: 25px;
    }
  }

  ul li {
    text-indent: 0;
  }
</style>