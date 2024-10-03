import { redirect } from "@sveltejs/kit";

export const actions = {
  insert: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const user = session.user.id
    const form = await request.formData()
    const todoTask = form.get( "todo_task" )
    const todoCategory = form.get( "todo_category" )

    if ( !session ) {
      redirect(303, "/")
    }

    try {
      const { data: form, error } = await supabase
      .from("todos")
      .insert({
        user_id: user,
        task: todoTask,
        category: todoCategory
      })
      .select()
      if ( error ) {
        throw error
      }
    } catch( error ) {
      
      return error
    }
  },

  update: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const user = session.user.id
    const form = await request.formData()
    const targetTodo = form.get( "todo_task" )
    const targetID = form.get( "todo_id" )

    console.log(targetID, targetTodo)

    if ( !session ) {
      redirect(303, "/")
    }

    try {
      const updatedTodo = await supabase
      .from("todos")
      .update({
        user_id: user,
        task: targetTodo
      })
      .eq("id", targetID)
      .select()
      return updatedTodo

    } catch( error ){
      console.log( error.message )
      return error.message
    }
  },

  delete: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const form = await request.formData()
    const targetTodo = form.get( "todo_task" )

    if ( !session ) {
      redirect(303, "/")
    }

    try {
      const { error } = await supabase
      .from("todos")
      .delete()
      .eq("task", targetTodo)
    } catch( error ){
      return error
    }
  }
}