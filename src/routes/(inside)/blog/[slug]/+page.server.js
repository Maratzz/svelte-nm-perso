/* export async function load({ locals: { supabase } }) {
  const { data: items } = await supabase
    .from("collection")
    .select("*")
  console.log("data:", items)
  return { items: items ?? []}
} */