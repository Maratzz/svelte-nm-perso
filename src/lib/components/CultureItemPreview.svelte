<script>
  export let item
</script>

<a href="/collection/{item.slug}">
  <img src={item.cover} alt="Affiche du {item.item_type} {item.name}" id={item.id}>
</a>

<style>
  img {
    cursor: pointer;
    width: 40vw;
    aspect-ratio: 3/4;
    position: relative;
    object-fit: cover;
  }

  @media (min-width: 900px) {
    img {
      width: 20vw;
    }
  }

  @media (min-width: 1500px) {
    img {
      width: 15vw;
    }
  }

  @media (min-width: 2000px) {
    img {
      width: 11vw;
    }
  }
</style>