export async function load({ parent }) {
  const { supabase, currentRoute, session } = await parent()

  let { data: listes } = await supabase
  .from("lists")
  .select("*")
  .order("name")

  return {
    listes: listes ?? [],
    currentRoute,
    session
  }
}