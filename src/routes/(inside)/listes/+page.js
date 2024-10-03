export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data: listes } = await supabase
  .from("lists")
  .select("*")

  return {
    listes: listes ?? [],
    currentRoute
  }
}