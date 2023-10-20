<script>
  import Todo from '$lib/components/Todo.svelte';
  import { onMount } from 'svelte';
  import { removeDuplicates } from '$lib/utils'
  export let data
  export let newTaskText = ''
  export let todoCategory = ''

  $: ({ todos, user, categories, supabase } = data)

  onMount(async () => {
    const selectWrap = document.querySelector('#todo-category')
    let uniqueItems = await removeDuplicates(categories)

    uniqueItems.forEach(category => {
      for (let key in category) {
        selectWrap.insertAdjacentHTML('beforeend', `<option value='${category[key]}'>${category[key]}</option>`)
      }
    })
  })

  //TODO: implement on delete

  $: updateCategory = async (input, btnClicked) => {

    const selectWrap = document.querySelector('#todo-category')
    const inputCategory = new Option(input, input)
    let uniqueItems = await removeDuplicates(categories)
    let existingCategory = uniqueItems.map(({category}) => category)

    if (btnClicked === 'Ajouter' && !existingCategory.includes(input)) {
        selectWrap.add(inputCategory, undefined)
        console.log('new category added')
        return existingCategory = [...existingCategory, input]
    } else if (btnClicked === 'Ajouter' && existingCategory.includes(input)) {
        console.log('category already exists, nothing to do here')
    } 
  }

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
        updateCategory(category, btn)
        newTaskText = ''
        todoCategory = ''
      }
    }
  }

  async function deleteTodo(todo) {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)
    const btn = 'Supprimer'
    if (error) {
      console.log(error.message)
    } else {
      todos = todos.filter(t => t.id !== todo.id)
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

  /*const displayCategoryTodo = async (event) => {
    let value = event.currentTarget.value
    let todos = document.querySelectorAll('.todo')
    let allTodos = [...todos]

    if (value === 'everything') {
      allTodos.forEach(e => 
          e.classList.remove('hide'))
    } else if (value !== 'everything') {
      let selectedTodos = allTodos.filter(todo => todo.classList.contains(value))
      let hiddenTodos = allTodos.filter(todo => !todo.classList.contains(value))
      selectedTodos.forEach(e => e.classList.remove('hide'))
      hiddenTodos.forEach(e => e.classList.add('hide'))

    }
  }*/
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
<select
  name="todo-category" 
  id="todo-category" >
  <option value="everything" selected>Toutes les catégories</option>
</select>

<ul>
  {#each todos as todo (todo.task)}
    <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)} onCompletion={() => onCompletion(todo)}/>
  {:else}
    <li>Rien à faire ! Pourquoi ne pas faire un tour du côté du backlog pour vider cette pile-là aussi ?</li>
  {/each}
</ul>

<style>
  ul {
    padding-left: 0;
  }
  #button-delete-all-todos {
    margin-top: 15px;
  }
</style>