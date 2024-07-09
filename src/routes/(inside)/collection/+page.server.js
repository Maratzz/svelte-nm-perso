import { redirect } from "@sveltejs/kit"
import { PUBLIC_TWITCH_CLIENT } from "$env/static/public"
import { PRIVATE_TWITCH_SECRET } from "$env/static/private"
import { getTwitchToken, getHumanDate, getGames } from "$lib/utils/index.js"

export const actions = {

  insert: async ({ request, locals: { supabase, safeGetSession } }) => {
    const session = await safeGetSession()
    const user = session.user.id
    const form = await request.formData()
    const newGame = form.get( "game_name" )
    const newPlatform = form.get( "game_platform" )
    const newStatus = form.get( "game_status" )
    const newCover = form.get( "game_cover" )
    const newReleasedDate = form.get( "game_released_date" )
    let newStarted = form.get( "game_started" )
    let newFinished = form.get( "game_finished" )
    let newAcquired = form.get( "game_acquired" )
    const newDeveloper = form.get( "game_developer" )
    const newNotes = form.get( "game_notes" )
    
    if ( !session ) {
      throw redirect(303, "/")
    }

    if ( session ) {
      if ( !newStarted ) {
        newStarted = null
      }
      if ( !newFinished ) {
        newFinished = null
      }
      if ( !newAcquired ) {
        newAcquired = null
      }
      try {
        const newForm = await supabase
        .from("games")
        .upsert([
          {
            user_id: user,
            name: newGame,
            platform: newPlatform,
            date_released: newReleasedDate,
            date_acquired: newAcquired,
            cover: newCover,
            date_started: newStarted,
            date_finished: newFinished,
            status: newStatus,
            developers: newDeveloper,
            notes: newNotes
          }
        ])
        .select()
        const supabaseResponse = await newForm
        return { newForm, supabaseResponse }
      } catch( error ) {
        return error
      } 
    }
  },

  search: async ({ request }) => {
    const token = await getTwitchToken( PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET )
    const access_token = token.access_token
    const form = await request.formData()
    let game = form.get( "game_name" )
    const gameString = game.toString()

    try {
      // all the info about a game
      const gameData = await getGames( PUBLIC_TWITCH_CLIENT, access_token, gameString )
      const newGame = gameData[0]
      if ( newGame === undefined ) throw "no game found"
      game = newGame.name
      const gameCover = newGame.cover?.image_id ?? "nocover"
      const gameCoverLink = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover}.png`
      const gameReleaseDate = await getHumanDate(newGame.first_release_date ?? "140140140")
      // we only want the developer studio, nothing else
      const gameCompanies = newGame.involved_companies ?? "Studio inconnu"
      let gameCompany
      if (gameCompanies !== "Studio inconnu") {
        const gameDevCompany = gameCompanies.filter( company => company.developer === true )
        gameCompany = gameDevCompany[0].company.name
      } else {
        gameCompany = "Studio inconnu"
      }
      
      return { 
        game,
        gameCompany,
        gameCoverLink,
        gameReleaseDate,
        success: true }

    } catch( error ) {
      console.log(error.message)
      return error
    }
  },

  update: async ({ request, locals: { supabase, safeGetSession } }) => {
    const session = await safeGetSession()
    const form = await request.formData()
    const updatedStatus = form.get( "updated_status" )
    const updatedStarted = form.get( "updated_started" )
    const updatedFinished = form.get( "updated_finished" )
    const updatedNotes = form.get( "updated_notes" )
    const gameID = form.get( "updated_id" )

    if ( !session ) {
      throw redirect(303, "/")
    }
    if ( session ) {
      try {
        const updatedForm = await supabase
        .from("games")
        .update(
          {
            status: updatedStatus,
            date_started: updatedStarted !== "" ? updatedStarted : null,
            date_finished: updatedFinished !== "" ? updatedFinished : null,
            notes: updatedNotes
          }
        )
        .eq("id", gameID)
        .select()
        return updatedForm

      } catch( error ) {
        console.log( error.message )
        return error.message
      }
    }
  }
}