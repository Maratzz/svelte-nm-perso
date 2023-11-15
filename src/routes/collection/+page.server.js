import { fail, redirect } from '@sveltejs/kit'
import { PUBLIC_TWITCH_CLIENT } from '$env/static/public'
import { PRIVATE_TWITCH_SECRET } from '$env/static/private'
import { getTwitchToken, getGameCover, getHumanDate, getGames } from '$lib/utils/index.js'

export const actions = {

  insert: async ({ request, locals: { supabase, getSession } }) => {

    const session = await getSession()
    const user = session.user.id

    const form = await request.formData()
    const newGame = form.get('game_name')
    const newPlatform = form.get('game_platform')
    const newStatus = form.get('game_status')
    const newCover = form.get('game_cover')
    const newReleasedDate = form.get('game_released_date')
    const newStarted = form.get('game_started')
    const newFinished = form.get('game_finished')
    
    if (!session) {
      throw redirect(303, '/')
    }
    if (session) {
      try {
        const newForm = await supabase
        .from('games')
        .insert([
          {user_id: user, name: newGame, platform: newPlatform, released_in: newReleasedDate, cover: newCover, started_at: newStarted, finished_at: newFinished, status: newStatus}
        ])
        .select()
  
        const formStatus = await newForm.status
  
        console.log(formStatus)
  
        return { newForm, formStatus }

      } catch(error) {
          console.error(error)
      } 
    }
  },

  search: async ({ request }) => {

    const token = await getTwitchToken(PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET)
    const access_token = token.access_token

    const form = await request.formData()
    const game = form.get('game_name')
    const gameString = game.toString()

    try {
      // all the info about a game
      const gameData = await getGames(PUBLIC_TWITCH_CLIENT, access_token, gameString)

      //extract the ID to use for cover associated with the game
      const gameID = gameData[0].id
      const gameReleaseDateRaw = gameData[0].first_release_date
  
      // extract cover data
      const gameCoverData = await getGameCover(PUBLIC_TWITCH_CLIENT, access_token, gameID)
  
      const gameReleaseDate = await getHumanDate(gameReleaseDateRaw)
  
  
      const gameCoverLink = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCoverData}.png`
  
      return { 
        success: true,
        game,
        gameData,
        gameID,
        gameCoverLink,
        gameReleaseDate }
    } catch(error) {
      console.log(error.message)
    }
  }
}