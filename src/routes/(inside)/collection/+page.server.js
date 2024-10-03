import { redirect } from "@sveltejs/kit"
import { PUBLIC_TWITCH_CLIENT } from "$env/static/public"
import { PRIVATE_TWITCH_SECRET } from "$env/static/private"
import { getTwitchToken, getHumanDate, getGames, slugify } from "$lib/utils/index.js"

export const actions = {

  insert: async ({ request, locals: { supabase, safeGetSession } }) => {
    const session = await safeGetSession()
    const user = session.user.id
    const form = await request.formData()
    const newItem = form.get( "item_name" )
    let slugName = await slugify(newItem)
    let newPlatform = form.get( "item_platform" )
    const newStatus = form.get( "item_status" )
    const newItemType = form.get( "item_type" )
    const newCover = form.get( "game_cover" )
    const newReleasedDate = form.get( "game_released_date" )
    let newStarted = form.get( "item_started" )
    let newFinished = form.get( "item_finished" )
    let newAcquired = form.get( "item_acquired" )
    const newDeveloper = form.get( "game_developer" )
    const newNotes = form.get( "item_notes" )
    
    if ( !session ) {
      redirect(303, "/")
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
      if ( !newPlatform ) {
        newPlatform = null
      }
      try {
        const newForm = await supabase
        .from("collection")
        .insert([
          {
            user_id: user,
            name: newItem,
            slug: slugName,
            platform: newPlatform,
            date_released: newReleasedDate,
            date_acquired: newAcquired,
            cover: newCover,
            date_started: newStarted,
            date_finished: newFinished,
            status: newStatus,
            author: newDeveloper,
            notes: newNotes,
            item_type: newItemType
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
    let game = form.get( "item_name" )
    const gameString = game.toString()

    try {
      // all the info about a game
      const gameData = await getGames( PUBLIC_TWITCH_CLIENT, access_token, gameString )
      const newItem = gameData[0]
      if ( newItem === undefined ) throw "no game found"
      game = newItem.name
      const gameCover = newItem.cover?.image_id ?? "nocover"
      const gameCoverLink = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover}.png`
      const gameReleaseDate = await getHumanDate(newItem.first_release_date ?? "140140140")
      // we only want the developer studio, nothing else
      const gameCompanies = newItem.involved_companies ?? "Studio inconnu"
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
  }
}