import { redirect } from '@sveltejs/kit'

export async function load({ parent }) {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/')
  }
  
  const { data } = await supabase.from('todos').select()

  return {
    user: session.user,
    todos: data ?? [],
    supabase
  }
}
