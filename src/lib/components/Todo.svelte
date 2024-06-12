<script>
  import { enhance } from '$app/forms'
  export let todo
</script>

  <form method="POST" class="todo form-group" use:enhance>

    <div>
      <input type="text" name="todo_id" bind:value={todo.id} readonly class="hidden">
      <input type="text" size="25" name="todo_task" bind:value={todo.task} on:input={(e) => { todo.task = e.currentTarget.value }}/>
      <button type="submit" formaction="?/update" class="hidden">Mettre à jour</button>
    </div>

    <button formaction="?/delete"  class="btn-danger">X</button>
    
  </form>

<style lang="scss">
  .hidden {
    display: none;
  }
  
  form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0;

    button {
      margin: 0;
      padding: 3px 5px;
    }
  }
</style>