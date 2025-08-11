export async function load({ params, parent }) {
  const { supabase, currentRoute, session } = await parent()

  let slug = params.slug
  let reverseSlug = slug.replace("-", " ")

  let { data: results } = await supabase
    .from("collection")
    .select("*")
    .ilike("author", reverseSlug)

  return {
    slug,
    results: results ?? [],
    supabase,
    currentRoute,
    session
   }
}