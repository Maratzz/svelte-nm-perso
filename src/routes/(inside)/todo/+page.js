import { redirect } from "@sveltejs/kit"

export async function load({ parent }) {
  const { supabase, session } = await parent()
  if ( !session ) {
    redirect(303, "/connexion")
  }

  const { data : todos } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false })

  const { data: categories } = await supabase
    .from("todos")
    .select("category")

  return {
    todos: todos ?? [],
    categories: categories ?? []
  }
}