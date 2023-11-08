export async function load({ parent }) {
  const { supabase, session } =  await parent()

  let { data: games } = await supabase
    .from('games')
    .select('*')

  let { data : categories } = await supabase
    .from('platforms')
    .select('*')
    .order('name', { ascending: true })
    
  return {
    games: games ?? [],
    categories : categories ?? [],
    supabase,
    session
  }
}