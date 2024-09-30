export async function load({ parent }) {
  const { supabase, session, currentRoute } =  await parent()

  let { data: collection } = await supabase
    .from("collection")
    .select("*")
    .order("date_updated", { ascending: false })

  let { data : categories } = await supabase
    .from("platforms")
    .select("*")
    .order("name", { ascending: true })

  let { data : status } = await supabase
    .from("game_status")
    .select("*")
    .order("id", { ascending: true })
    
  return {
    collection: collection ?? [],
    categories : categories ?? [],
    status: status ?? [],
    supabase,
    session,
    currentRoute
  }
}