<script>
  import Todo from '$lib/components/Todo.svelte'
  import { removeDuplicates } from '$lib/utils'
  import { fade } from 'svelte/transition'
  export let data
  export let newTaskText = ''
  export let todoCategory = ''

  $: ({ todos, user, categories, supabase } = data)
  $: { removeDuplicates(categories)
      .then(res => uniqueCategories = res.map(({category}) => category))}

  let selected = 'everything'
  let filteredTodos = []
  let uniqueCategories = []

  async function fetchTodos() {
    const { data } = await supabase
      .from('todos')
      .select()
      .order('inserted_at', { ascending: true })
    todos = data
    filteredTodos = await todos.filter(todo => todo.category === selected)
  }

 const filterTodos = async (event) => {
    const value = event.currentTarget.value
    const { data } = await supabase.from('todos').select().order('inserted_at', { ascending: true})
    const { data: categories } = await supabase
    .from('todos')
    .select('category')
    selected = value
    todos = data
    filteredTodos = await todos.filter(todo => todo.category === selected)
    uniqueCategories = await removeDuplicates(categories).then(res => uniqueCategories = res.map(({category}) => category))
  }

  const addTodo = async () => {
    let task = newTaskText.trim()
    const category = todoCategory.trim()
    if (task.length) {
      let { data: todo, error } = await supabase
        .from('todos')
        .insert({task, user_id: user.id, category: category})
        .select()
        .single()

      if (error) {
        console.log(error.message)
      } else {
        todos = [...todos, todo]
        if (!uniqueCategories.includes(category)) {
          uniqueCategories = [...uniqueCategories, category]
          console.log(`Added a new category to the list: '${category}'`)
        } else {
          console.log(`The category '${category}' already exists, not adding it to the select list`)
        }
        if (selected === category) {
          filteredTodos = [...filteredTodos, todo]
        }
        newTaskText = ''
        todoCategory = ''
      }
    }
  }

  async function deleteTodo(todo) {
    const todoCategory = todo.category
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)
    todos = todos.filter(t => t.id !== todo.id)
    filteredTodos = todos.filter(t => t.category === todoCategory)
    console.log(`deleted todo: ${todo.task}`)
    if (error) {
      console.error(error || error.message)
    }
  }

  async function updateTodo(todo) {
    const { data, error } = await supabase
      .from('todos')
      .update({ task: todo.task })
      .eq('id', todo.id) 
    if (error) {
      console.log(error.message)
    } else {
      fetchTodos()
    }
  }
</script>

<svelte:head>
  <title>Liste de tâches - Nico Moisson</title>
</svelte:head>

<h1>Liste de tâches</h1>

<div id="form-todo">

  <form on:submit|preventDefault={() => addTodo(newTaskText)}>

    <label for="todo-input">Tâche</label>
    <input 
      type="text"
      name="todo-input"
      id="todo-input"
      placeholder="new task"
      bind:value={newTaskText}>

    <label for="todo-category-selection">Catégorie :</label>
    <input
      name="todo-category-selection"
      id="todo-category-selection"
      placeholder="new category"
      bind:value={todoCategory}>

    <button type="submit" id="button-add-todo">Ajouter</button>

  </form>

</div>

<div id="select-todo">

  <label for="todo-category">Afficher</label>
  <select name="todo-category" id="" bind:value={selected} on:change={filterTodos}>
    <option value='everything'>Toutes les catégories</option>
    {#key uniqueCategories}
      {#each uniqueCategories as category}
        <option value={category} selected={category}>{category}</option>
      {/each}
    {/key}
  </select>

</div>

{#key selected}
  <ul class="removePaperLi" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {#if selected === 'everything'}
      {#each todos as todo (todo.task)}
        <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)}/>
      {/each}
    {:else}
      {#each filteredTodos as todo (todo.task)}
        <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)}/>
      {/each}
    {/if}
  </ul>
{/key}

<style>

  ul {
    padding-left: 0;
  }

  #button-add-todo, #select-todo {
    margin-top: 15px;
  }

  #form-todo input {
    margin-bottom: 10px;
  }
</style>