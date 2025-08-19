export async function load({ parent }) {
  const { supabase, currentRoute, session } = await parent()

  let { data: listes } = await supabase
  .from("lists")
  .select("*")
  .order("name")

  let { data : listes_themes } = await supabase
  .from("lists_theme")
  .select("*")
  .order("name")

  let { data: item_type } = await supabase
  .from("item_type")
  .select("*")
  .order("name")

  return {
    listes: listes ?? [],
    listesThemes: listes_themes ?? [],
    itemTypes: item_type ?? [],
    currentRoute,
    session
  }
}