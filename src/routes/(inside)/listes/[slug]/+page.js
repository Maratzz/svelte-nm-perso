export async function load({ params, parent }) {
  const { supabase, currentRoute } = await parent()

  let slug = params.slug

  let { data: liste } = await supabase
    .from("lists")
    .select(`*,
      collection ( id, name, slug, cover, item_type )
      `)
    .eq("slug", slug)

    return {
      liste: liste ?? [],
      supabase,
      currentRoute
    }
}