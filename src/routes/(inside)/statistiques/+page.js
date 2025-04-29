export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data : collection } = await supabase
    .from("collection")
    .select("*")
    .order("date_created", { ascending: true })

  return {
    collection: collection ?? [],
    currentRoute
  }
}