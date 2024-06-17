export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data: listes } = await supabase
  .from("lists")
  .select(`
    id,
    name,
    description,
    games ( name )`)

  return {
    listes: listes ?? [],
    currentRoute
  }
}