import { redirect } from "@sveltejs/kit";

export const actions = {
  insert: async ({ request, locals: { supabase, getSession }}) => {
    const session = await getSession()
    const user = session.user.id
    const form = await request.formData()
    const todoTask = form.get( "todo_task" )
    const todoCategory = form.get( "todo_category" )

    if ( !session ) {
      throw redirect(303, "/")
    }

    try {
      const { data: form, error } = await supabase
      .from("todos")
      .insert({
        user_id: user,
        task: todoTask,
        category: todoCategory
      })
    } catch( error ) {
      return error
    }
  }
}