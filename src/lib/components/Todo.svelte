<script>
  export let todo
  export let onDelete = () => {}
  export let onUpdate = () => {}
</script>

<li>
  <div id="todo-{todo.id}" class="todo {todo.category} form-group">
    
    <input 
      type="text"
      size="50"
      bind:value={todo.task}
      on:input={(e) => {
        todo.task = e.currentTarget.value
      }
    } />

    <button 
      type="button"
      class="button-delete-todo btn-danger"
      on:click={onDelete}>Supprimer
    </button>

    <button
      type="button"
      id="button-update-todo"
      class="btn-warning"
      on:click={onUpdate}>Mettre à jour
    </button>
    
  </div>
</li>



<style>
  li {
    margin-bottom: 10px;
  }
  .todo {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    & button {
      margin-left: 10px;
    }
  }
</style>