export async function load({ params, parent }) {
  const { supabase, currentRoute, session } = await parent()

  let slug = params.slug

  let { data: item } = await supabase
    .from("collection")
    .select("*")
    .eq('slug', slug)
    .single()

  //three operations to get the tierlists with tiers which include the [slug] item displayed.
  //TODO: come back to this and simplify it perhaps, or let it go if it works and is not that
  // much costly to run after all on a single page/call. It's ugly but it runs.
  let { data: supabase_tier_items } = await supabase
    .from("tier_items")
    .select("tier_id")
    .eq("item_id", item.id)
  let tier_items = supabase_tier_items.map(item => item.tier_id)

  let { data: supabase_tiers } = await supabase
    .from("tiers")
    .select("tier_list_id")
    .in("id", tier_items)
  let tiers = supabase_tiers.map(tier => tier.tier_list_id)

  let { data: tierlists } = await supabase
    .from("tier_lists")
    .select("*")
    .in("id", tiers)

  return {
    item: item ?? [],
    tierlists: tierlists ?? [],
    supabase,
    currentRoute,
    session
   }
}