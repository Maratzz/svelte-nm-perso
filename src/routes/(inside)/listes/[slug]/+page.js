export async function load({ params, parent }) {
  const { supabase, session } = await parent()

  let slug = params.slug

  let { data: liste } = await supabase
    .from("tier_lists")
    .select(`
      *,
      tiers:tiers (
        *,
        tier_items:tier_items (
          *,
          collection:collection (slug, cover, name, id, item_type)
        )
      )
    `)
    .eq("slug", slug)
    .single()
  console.log("liste: ", liste)

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