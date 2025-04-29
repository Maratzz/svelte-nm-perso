export async function load({ parent }) {
  const { supabase, session, currentRoute } =  await parent()

  let { data: collection } = await supabase
    .from("collection")
    .select("*")
    .order("date_created", { ascending: false })

  let { data : categories } = await supabase
    .from("platforms")
    .select("*")
    .order("name", { ascending: true })

  let { data : status } = await supabase
    .from("culture_item_status")
    .select("*")
    .order("id", { ascending: true })

  let { data : types } = await supabase
    .from("item_type")
    .select("*")
    .order("id", { ascending: true })

  let { data : tags } = await supabase
    .from("collection")
    .select("tags")
  let allTags = tags
    .filter(item => item.tags !== null)
    .flatMap(item => item.tags)
  let uniqueTags = [...new Set(allTags)]

  let { data: gamePlatforms } = await supabase
    .from("game_platforms")
    .select("*")
    .order("name", { ascending: true })

  return {
    collection: collection ?? [],
    categories : categories ?? [],
    status: status ?? [],
    types: types ?? [],
    tags: uniqueTags ?? [],
    gamePlatforms: gamePlatforms ?? [],
    supabase,
    session,
    currentRoute
  }
}