<script>
  import { enhance } from '$app/forms'
</script>

<form method="POST" action="?/insert" use:enhance>

  <div class="inner_form">
    <label for="todo_task">Tâche</label>
    <input type="text" name="todo_task" id="todo_task" placeholder="new task" required>
  </div>

  <div class="inner_form">
    <label for="todo_category">Catégorie :</label>
    <input name="todo_category" id="todo_category" placeholder="new category" required>
  </div>

  <button type="submit">Ajouter</button>

</form>

<style lang="scss">
  form {
    margin: 0 0 15px 0;
    padding: 0;
  }

  .inner_form {
    margin-bottom: 15px;
  }
</style>