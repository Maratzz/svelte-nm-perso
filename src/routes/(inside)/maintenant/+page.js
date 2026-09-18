export async function load({ fetch, parent }) {
  const { supabase, session } = await parent()

  let { data : collection_dates } = await supabase
    .from("collection_dates")
    .select(`
      oeuvre_id:collection(id, cover, slug, name),
      date_started, date_finished, status
      )`
    )
    .order("date_finished", { ascending: false })
  
  let collection = collection_dates
    .map((item) => ({
      id: item.oeuvre_id.id,
      name: item.oeuvre_id.name,
      cover: item.oeuvre_id.cover,
      slug: item.oeuvre_id.slug,
      status: item.status,
      date_finished: item.date_finished
    }))

  let { data: maintenant } = await supabase
  .from("maintenant")
  .select("*")

  const texts = await fetch(`/api/every-texts`)
  const latestText = await texts.json()
    .then (( data ) => data.filter( post => post.meta.categories.includes( "textes" ))
  )

  return {
    collection: collection ?? [],
    maintenant: maintenant[0] ?? [],
    text: latestText[0],
    session
  }
}