export async function load({ parent }) {
  const { supabase, session, currentRoute } = await parent()

  let { data: tierlist } = await supabase
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
    .order("date_created", { ascending: false })

  return {
    tierlist: tierlist ?? [],
    supabase,
    session,
    currentRoute
  }
}