export async function load({ params, parent }) {
  const { supabase, session } = await parent()

  let slug = params.slug

  let { data: liste } = await supabase
    .from("lists")
    .select(`*,
      collection ( id, name, slug, cover, item_type )
      `)
    .eq("slug", slug)

  let { data: collection } = await supabase
    .from("collection")
    .select("name, slug")

    return {
      liste: liste ?? [],
      collection: collection ?? [],
      supabase,
      session
    }
}