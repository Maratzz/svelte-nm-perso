<script>
  export let data
  let { posts, items } = data
  let formatDate = (e) => { 
    let options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
    return new Date(e).toLocaleDateString('fr', options)
  }

  let attachCoverImage = (target, database) => {
    let foundRow = database.find( e => e.name === target)
    if (foundRow === undefined) {
      return 'https://placehold.co/140x190'
    } else {
      let coverImage = foundRow.cover
      console.log(coverImage)
      return coverImage
    }
  }
</script>

<svelte:head>
  <title>Textes - Nico Moisson</title>
  <meta name="description" content="Textes, critiques, poèmes, souvent autour du jeu vidéo, mais pas que.">
</svelte:head>

<h1>Textes</h1>
    
<ul class="removePaperLi container">
  {#each posts as post}
    <li>
      <div class="item">
        <div class="item__img">
          <img 
            src={attachCoverImage(post.meta.title, items)} 
            alt=" Illustration du texte">
        </div>
        <div class="item__content">
          <h2>
            <a href={post.path}>
              {post.meta.title}
            </a>
          </h2>
          <p>Publié le {formatDate(post.meta.date)}</p>
          <p>{post.meta.headline ?? 'Headline missing'}</p>
        </div>
        
        
        
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
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
    margin: 10px 15px;
    background-color: rgb(255, 255, 255);
    padding: 15px 25px;
    border-radius: 5px;
    align-items: center;
    &__img {
      width: 140px;
      height: auto;
      flex: 1 0 auto;
    }
    &__content {
      margin-left: 25px;
      flex: 2 0 80%;
    }
  }

  ul li {
    text-indent: 0;
  }
</style>