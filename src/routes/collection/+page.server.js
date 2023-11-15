import { fail, redirect } from '@sveltejs/kit'
import { PUBLIC_TWITCH_CLIENT } from '$env/static/public'
import { PRIVATE_TWITCH_SECRET } from '$env/static/private'
import { getTwitchToken } from '$lib/utils'
import { getGames } from '$lib/utils'
import { getGameCover, getHumanDate } from '$lib/utils/index.js'
//import { getHumanDate } from '$lib/utils/index.js'


export const actions = {

  default: async ({request, locals: { supabase, getSession }}) => {
    
  },

  search: async ({ request }) => {

    const token = await getTwitchToken(PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET)
    const access_token = token.access_token

    const form = await request.formData()
    const game = form.get('new-game')
    const gameString = game.toString()

    // all the info about a game
    const gameData = await getGames(PUBLIC_TWITCH_CLIENT, access_token, gameString)
    //extract the ID to use for cover associated with the game
    const gameID = gameData[0].id
    const gameReleaseDateRaw = gameData[0].first_release_date

    // extract cover data
    const gameCoverData = await getGameCover(PUBLIC_TWITCH_CLIENT, access_token, gameID)

    const gameReleaseDate = await getHumanDate(gameReleaseDateRaw)


    const gameCoverLink = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCoverData}.png`

    console.log(gameData, gameCoverLink, gameReleaseDate)

    return { 
      success: true,
      game,
      gameData,
      gameID,
      gameCoverLink,
      gameReleaseDate }
  }
}