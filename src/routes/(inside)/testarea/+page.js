export async function load({ parent }) {
  const { supabase, session, currentRoute } =  await parent()

  let { data: collection } = await supabase
    .from("collection")
    .select("*")
    .order("date_updated", { ascending: false })

  return {
    collection: collection ?? [],
    supabase,
    session,
    currentRoute
  }
}