export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data : collection } = await supabase
    .from("collection")
    .select("*")
    .order("date_created", { ascending: true })
  
    let { data : status } = await supabase
      .from("culture_item_status")
      .select("name,converted")
      .order("id", {ascending: true})

  return {
    collection: collection ?? [],
    status: status ?? [],
    currentRoute
  }
}