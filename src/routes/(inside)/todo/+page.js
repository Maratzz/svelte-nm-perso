import { redirect } from "@sveltejs/kit"

export async function load({ parent }) {
  const { supabase, session } = await parent()
  if ( !session ) {
    throw redirect(303, "/")
  }
  
  const { data : todos } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: true })

  const { data: categories } = await supabase
    .from("todos")
    .select("category")

  return {
    user: session.user,
    todos: todos ?? [],
    categories: categories ?? [],
    supabase
  }
}
