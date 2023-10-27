<script>
  export let todo
  export let onDelete = () => {}
  export let onUpdate = () => {}
  export let onCompletion = () => {}
</script>

<div id="todo-{todo.id}" class="todo {todo.category}">
  <li>
    <input type="checkbox" id="todo-is-complete" bind:checked={todo.is_complete} on:click={onCompletion}>
    <input 
      type="text"
      size="50"
      id="todo-task"
      bind:value={todo.task}
      on:input={(e) => {
        todo.task = e.currentTarget.value
      }
    } />
  </li>
  <button 
    type="button"
    class="button-delete-todo"
    on:click={onDelete}>Supprimer</button>
  <button
    type="button"
    id="button-update-todo"
    on:click={onUpdate}>Mettre à jour
  </button>
</div>


<style>
  li {
    list-style: none;
    display: flex;
  }

  .todo {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    & button {
      margin-left: 10px;
    }
  }
</style>