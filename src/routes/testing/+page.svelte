<script>
  import Todo from '$lib/components/Todo.svelte';
  export let data
  export let newTaskText = ''
  $: ({ todos, user, supabase } = data)

  async function addTodo() {
    let task = newTaskText.trim()
    if (task.length) {
      let { data : todo, error } = await supabase
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

  function deleteTodo() {
    console.log('you clicked it!')
  }

</script>

<form action="" on:submit|preventDefault={() => addTodo(newTaskText)}>
  <input type="text" name="" id="" bind:value={newTaskText}>
  <button>Ajouter</button>
</form>

<ul>
  {#each todos as todo}
    <Todo {todo} onDelete={() => deleteTodo()}/>
  {/each}
</ul>
