<script>
  import Todo from '$lib/components/Todo.svelte';
  import { removeDuplicates } from '$lib/utils'
  export let data
  export let newTaskText = ''
  export let todoCategory = ''

  let selected = 'everything'

  $: ({ todos, user, categories, supabase } = data)
  $: uniqueCategories = []
  $: removeDuplicates(categories).then(res => uniqueCategories = res.map(({category}) => category))
  $: console.log(uniqueCategories)
  $: filteredTodos = todos.filter(todo => todo.category === selected)

  async function fetchTodos() {
    const { data } = await supabase
      .from('todos')
      .select()
      .order('inserted_at', { ascending: true })
    todos = data
  }

  const addTodo = async () => {
    const btn = 'Ajouter'
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
  
  async function onCompletion(todo) {
    let BooleanValue = todo.is_complete
    const { data, error} = await supabase
      .from('todos')
      .update({is_complete: !BooleanValue})
      .eq('id', todo.id)
    if (error) {
      console.log(error)
    }
  }

  const deleteCompletedTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('is_complete', 'TRUE')
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

  <h2>Que voulez-vous faire ?</h2>

  <form action="" on:submit|preventDefault={() => addTodo(newTaskText)}>

    <label for="todo-input">Tâche</label>
    <input 
      type="text"
      name="todo-input"
      id="todo-input"
      bind:value={newTaskText}>

    <label for="todo-category-selection">Catégorie :</label>
    <input
      name="todo-category-selection"
      id="todo-category-selection"
      bind:value={todoCategory}>

    <button type="submit" id="button-add-todo">Ajouter</button>

  </form>

  <button type="button" on:click={deleteCompletedTodos} id="button-delete-all-todos">Supprimer toutes les tâches complétées</button>

</div>

<label for="todo-category">Afficher</label>
<select name="todo-category" id="" bind:value={selected}>
  <option value='everything'>Toutes les catégories</option>
  {#each uniqueCategories as category}
    <option value={category} selected={category}>{category}</option>
  {/each}
</select>

<p>selected is {selected}</p>

<ul>
  {#if selected === 'everything'}
    {#each todos as todo (todo.task)}
      <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)} onCompletion={() => onCompletion(todo)}/>
    {/each}
  {:else}
    {#each filteredTodos as todo (todo.task)}
      <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)} onCompletion={() => onCompletion(todo)}/>
    {/each}
  {/if}
  
</ul>

<style>
  ul {
    padding-left: 0;
  }
  #button-delete-all-todos {
    margin-top: 15px;
  }
</style>