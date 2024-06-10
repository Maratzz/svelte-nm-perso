<script>
  import Todo from "$lib/components/Todo.svelte"
  import TodoForm from "$lib/components/TodoForm.svelte"
  import { removeDuplicates } from "$lib/utils"
  import { fade } from "svelte/transition"

  export let data

  $: ({ todos, categories } = data)
  $: { removeDuplicates( categories )
      .then( res => uniqueCategories = res.map(({ category }) => category ))}
  $: filteredTodos = todos

  let uniqueCategories = []

  const filterTodos = async () => {
    const categorySelected = document.getElementById("todo-category")
    const selectedValue = categorySelected.value
    if (selectedValue !== "everything") {
      filteredTodos = await todos.filter( todo => todo.category === selectedValue )
      return filteredTodos
    } else {
      filteredTodos = todos
      return filteredTodos
    }
  }

  const deleteTodo = async ( todo ) => {
    const todoCategory = todo.category
    try {
      const { data } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id)
      filteredTodos = todos.filter( todo => todo.category === todoCategory )
    } catch( error ) {
      console.log( error || error.message )
      return error
    }
  }

  const updateTodo = async ( todo ) => {
    try {
      const { data, error } = await supabase
      .from("todos")
      .update({ task: todo.task })
      .eq("id", todo.id) 
    } catch( error ) {
      console.log( error )
      return error
    } finally {
      filteredTodos = todos
    }
  }
</script>

<svelte:head>
  <title>Liste de tâches - Nico Moisson</title>
</svelte:head>

<h1>Liste de tâches</h1>

<TodoForm />

<div id="select-todo">

  <label for="todo-category">Afficher</label>
  <select name="todo-category" id="todo-category" on:change={filterTodos}>
    <option value="everything" selected>Toutes les catégories</option>
    {#key uniqueCategories}
      {#each uniqueCategories as category}
        <option value={category}>{category}</option>
      {/each}
    {/key}
  </select>

</div>

{#key filteredTodos}
  <div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#each filteredTodos as todo (todo.task)}
      <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)}/>
    {/each}
  </div>
{/key}

<style>
</style>