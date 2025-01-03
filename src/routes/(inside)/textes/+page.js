export const load = async ({ fetch, parent }) => {
  const { supabase } = await parent()
  const response = await fetch(`/api/every-texts`)
  const posts = await response.json()
    .then (( data ) => data.filter( post => post.meta.categories.includes( "textes" ))
  )

  const { data : items } = await supabase
    .from("collection")
    .select("*")

  return {
    posts,
    items
  }
}