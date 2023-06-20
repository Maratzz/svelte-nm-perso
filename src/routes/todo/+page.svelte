<script>
  import Todo from '$lib/components/Todo.svelte';
  export let data
  export let newTaskText = ''
  $: ({ todos, user, supabase } = data)

  async function fetchTodos() {
    const { data } = await supabase
      .from('todos')
      .select()
      .order('id', { ascending: true })
    todos = data
  }

  async function addTodo() {
    let task = newTaskText.trim()
    if (task.length) {
      let { data: todo, error } = await supabase
        .from('todos')
        .insert({task, user_id: user.id})
        .select()
        .single()

      if (error) {
        console.log(error.message)
      } else {
        todos = [...todos, todo]
        console.log('successfully added new task:' + newTaskText)
        newTaskText = ''
      }
    }
  }

   async function deleteTodo(todo) {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)
    
    if (error) {
      console.log(error.message)
    } else {
      fetchTodos()
      console.log('successfully deleted task!')
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
      console.log('todo successfully updated!')
    }
  }
    
</script>

<form action="" on:submit|preventDefault={() => addTodo(newTaskText)}>
  <input type="text" name="" id="" bind:value={newTaskText}>
  <button>Ajouter</button>
</form>

<ul>
  {#each todos as todo (todo.task)}
    <Todo {todo} onDelete={() => deleteTodo(todo)} onUpdate={() => updateTodo(todo)}/>
  {/each}
</ul>

<style>
  ul {
    padding-left: 0;
  }
</style>