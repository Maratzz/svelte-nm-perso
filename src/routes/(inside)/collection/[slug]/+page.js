export async function load({ params, parent }) {
  const { supabase, currentRoute, session } = await parent()

  let slug = params.slug

  let { data: item } = await supabase
    .from("collection")
    .select("*")
    .eq('slug', slug)

  let { data: lists } = await supabase
    .from("collection")
    .select(`
      name,
      lists (
        name, slug )
    `)
    .eq("slug", slug)

  let { data: allLists } = await supabase
    .from("lists")
    .select("name, slug")

  return {
    item: item[0] ?? [],
    lists: lists ?? [],
    allLists: allLists ?? [],
    supabase,
    currentRoute,
    session
   }
}