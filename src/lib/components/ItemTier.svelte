<script lang="ts">
  export let item
</script>

<div id={item.collection.id}>
  <a href="/collection/{item.collection.slug}">
    <img src={item.collection.cover ?? item.cover} alt="Affiche du {item.collection.item_type} {item.collection.name}" >
  </a>
</div>

<style>
  img {
    width: 90px;
    aspect-ratio: 3/4;
    position: relative;
    object-fit: cover;
  }
</style>