export async function load({ parent}) {
  const { supabase, session, currentRoute } = await parent()

  let { data: patchNotes } = await supabase
    .from("patch_notes")
    .select("*")
    .order("date", { ascending: false })

  return {
    patchNotes: patchNotes ?? [],
    supabase,
    session,
    currentRoute
  }
}
