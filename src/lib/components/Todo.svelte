<script>
  export let todo
  export let onDelete = () => {}
</script>

<li>- {todo.task}</li>
<button type="button" on:click={onDelete}>Supprimer</button>

<style>
  li {
    list-style: none;
  }
</style>