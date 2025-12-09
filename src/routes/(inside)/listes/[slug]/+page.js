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
          collection:item_id (slug, cover, name, id, item_type)
        )
      )
    `)
    .eq("slug", slug)
    //syntax from Supabase JS API to order items nested in a referenced table
    .order("order", { referencedTable: "tiers", ascending: true })
    .single()

  return {
    liste: liste ?? [],
    supabase,
    session
  }
}