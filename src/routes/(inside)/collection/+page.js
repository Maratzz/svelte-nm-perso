export async function load({ parent }) {
  const { supabase, session, currentRoute } =  await parent()

  let { data: games } = await supabase
    .from('games')
    .select('*')
    .order('name', { ascending: true })

  let { data : categories } = await supabase
    .from('platforms')
    .select('*')
    .order('name', { ascending: true })

  let { data : status } = await supabase
    .from('game_status')
    .select('*')
    .order('name', { ascending: true })
    
  return {
    games: games ?? [],
    categories : categories ?? [],
    status: status ?? [],
    supabase,
    session,
    currentRoute
  }
}