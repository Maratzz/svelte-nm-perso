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
</script>

<svelte:head>
  <title>Liste de tâches - Nico Moisson</title>
</svelte:head>

<div>
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
  <div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }} id="todo-wrap">
    {#each filteredTodos as todo (todo.task)}
      <Todo {todo}/>
    {/each}
  </div>
  {/key}
</div>


<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 120px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 140px;
    }
  }

  #select-todo {
    margin-bottom: 15px;
  }
</style>