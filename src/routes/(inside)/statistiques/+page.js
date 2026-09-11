export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data : status } = await supabase
    .from("culture_item_status")
    .select("name,converted")
    .order("id", {ascending: true})

  let { data: collection_dates } = await supabase
    .from("collection_dates")
    .select(`
      oeuvre_id:collection(id, item_type, date_released),
      date_started, date_finished, status
      )`
    )

  const uniqueItemMap = new Map()
  let collection = collection_dates
    .map((item) => ({
      id: item.oeuvre_id.id,
      item_type: item.oeuvre_id.item_type,
      date_released: item.oeuvre_id.date_released,
      date_finished: item.date_finished,
      status: item.status
    }))
    .filter((item) => {
      if (!uniqueItemMap.has(item.id)) {
        uniqueItemMap.set(item.id, true)
        return true
      }
      return false
    })

  return {
    collection: collection ?? [],
    status: status ?? [],
    currentRoute
  }
}