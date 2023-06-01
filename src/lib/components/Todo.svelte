<script>
  export let todo
  export let onDelete = () => {}
  export let onUpdate = () => {}
</script>

<li>
  - <input 
    type="text"
    bind:value={todo.task}
    on:input={(e) => {
      todo.task = e.currentTarget.value
    }
  } />
</li>
<button 
  type="button"
  on:click={onDelete}>Supprimer</button>
<button
  type="button"
  on:click={onUpdate}>Mettre à jour</button>

<style>
  li {
    list-style: none;
  }
</style>