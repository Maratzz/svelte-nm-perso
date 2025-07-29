export async function load({ parent }) {
  const { supabase, currentRoute } = await parent()

  let { data: memorabilia } = await supabase
    .from("memorabilia")
    .select("*")
    .order("created_at", { ascending:  false })

  return {
    souvenirs: memorabilia ?? [],
    currentRoute
  }
}

export const ssr = false