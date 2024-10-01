export async function load({ params, parent }) {
  const { supabase, currentRoute } = await parent()

  let slug = params.slug

  let { data: item } = await supabase
    .from("collection")
    .select("*")
    .eq('slug', slug)

  return {
    item: item[0] ?? [],
    supabase,
    currentRoute
   }
}