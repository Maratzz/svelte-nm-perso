export async function load({ parent }) {
  const { supabase } =  await parent()

  let { data: games, error } = await supabase
  .from('games')
  .select('*')

  return {
    games: games ?? [],
    supabase
  }
}