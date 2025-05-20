export async function load({ fetch, parent }) {
  const { supabase, session } = await parent()

  let { data: collectionNow } = await supabase
  .from("collection")
  .select("name, author, cover, slug")
  .eq("status", "currently playing")
  .order("date_updated", { ascending: false })
  .limit(4)

  let { data: collectionLastFinished } = await supabase
  .from("collection")
  .select("name, author, cover, slug")
  .eq("status", "finished")
  .gte("date_finished", "1970-01-01")
  .order("date_finished", { ascending: false })
  .limit(4)

  let { data: maintenant } = await supabase
  .from("maintenant")
  .select("*")

  const texts = await fetch(`/api/every-texts`)
  const latestText = await texts.json()
    .then (( data ) => data.filter( post => post.meta.categories.includes( "textes" ))
  )

  return {
    collectionNow: collectionNow ?? [],
    collectionLastFinished: collectionLastFinished ?? [],
    maintenant: maintenant[0] ?? [],
    text: latestText[0],
    session
  }
}