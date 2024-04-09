import { redirect } from '@sveltejs/kit'
import { PUBLIC_TWITCH_CLIENT } from '$env/static/public'
import { PRIVATE_TWITCH_SECRET } from '$env/static/private'
import { getTwitchToken, getHumanDate, getGames } from '$lib/utils/index.js'

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
    let newStarted = form.get('game_started')
    let newFinished = form.get('game_finished')
    const newDeveloper = form.get('game_developer')
    const newNotes = form.get('game_notes')
    
    if (!session) {
      throw redirect(303, '/')
    }
    if (session) {
      if (!newStarted) {
        newStarted = null
      }
      if (!newFinished) {
        newFinished = null
      }
      
      try {
        const newForm = await supabase
        .from('games')
        .upsert([
          {
            user_id: user, 
            name: newGame, 
            platform: newPlatform, 
            released_in: newReleasedDate, 
            cover: newCover, 
            started_at: newStarted, 
            finished_at: newFinished, 
            status: newStatus, 
            developers: newDeveloper,
            notes: newNotes
          }
        ])
        .select()
  
        const formStatus = await newForm.status
  
        return { newForm, formStatus, success : true }

      } catch(error) {
          return { success: false }
      } 
    }
  },

  search: async ({ request }) => {

    const token = await getTwitchToken(PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET)
    const access_token = token.access_token

    const form = await request.formData()
    let game = form.get('game_name')
    const gameString = game.toString()

    try {
      // all the info about a game
      const gameData = await getGames(PUBLIC_TWITCH_CLIENT, access_token, gameString)
      const newGame = gameData[0]
      if (newGame === undefined) throw 'no game found'
      game = newGame.name
      const gameCover = newGame.cover.image_id
      const gameCoverLink = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover}.png`
      const gameReleaseDate = await getHumanDate(newGame.first_release_date)
      // we only want the developer studio, nothing else
      const gameCompanies = newGame.involved_companies
      const gameDevCompany = gameCompanies.filter(company => company.developer === true)
      const gameCompany = gameDevCompany[0].company.name
      
      return { 
        game,
        gameCompany,
        gameCoverLink,
        gameReleaseDate,
        success: true }

    } catch(error) {
      return error
    }
  }
}