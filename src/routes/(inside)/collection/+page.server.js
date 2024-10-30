import { redirect } from "@sveltejs/kit"
import { PUBLIC_TWITCH_CLIENT } from "$env/static/public"
import { PRIVATE_TWITCH_SECRET } from "$env/static/private"
import { PRIVATE_TMDB_BEARER } from "$env/static/private"
import { slugify } from "$lib/utils/index.js"

import { getTwitchToken, getGames, getMovieDetails, getAnilistDetails } from "$lib/utils/apiCalls.js"

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
    const newCover = form.get( "item_cover" )
    const newDateReleased = form.get( "item_date_released" )
    let newDateStarted = form.get( "item_date_started" )
    let newDateFinished = form.get( "item_date_finished" )
    let newDateAcquired = form.get( "item_date_acquired" )
    let newOriginalName = form.get( "item_original_name" )
    const newAuthor = form.get( "item_author" )
    const newNotes = form.get( "item_notes" )
    
    if ( !session ) {
      redirect(303, "/")
    }

    if ( session ) {
      if ( !newDateStarted ) {
        newDateStarted = null
      }
      if ( !newDateFinished ) {
        newDateFinished = null
      }
      if ( !newDateAcquired ) {
        newDateAcquired = null
      }
      if ( !newPlatform ) {
        newPlatform = null
      }
      if ( !newOriginalName ) {
        newOriginalName = null
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
            date_released: newDateReleased,
            date_acquired: newDateAcquired,
            cover: newCover,
            date_started: newDateStarted,
            date_finished: newDateFinished,
            status: newStatus,
            author: newAuthor,
            notes: newNotes,
            item_type: newItemType,
            original_name: newOriginalName
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

  searchAPI: async ({ request }) => {
    const form = await request.formData()
    let newItemName = form.get( "item_name" ).toString()
    const newDateGreater = form.get( "item_date_greater").toString() ?? "1900"
    let newRadio = form.get( "api_type" ).toString()

    const apiCall = async () => {
      let apiResults
      switch (newRadio) {
        case "jeu vidéo":
          const token = await getTwitchToken( PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET )
          //IGDB requires unix-based timestamp for filtering
          const newDate = new Date(Date.parse(`${newDateGreater}-01-01`)) / 1000
          const gameString = newItemName.toString()
          apiResults = await getGames( PUBLIC_TWITCH_CLIENT, token, gameString, newDate)
          break
        case "film":
          apiResults = await getMovieDetails(PRIVATE_TMDB_BEARER, newItemName, newDateGreater)
          break
        case "anime":
        case "manga":
          apiResults = await getAnilistDetails( newDateGreater, newRadio, newItemName )
          break
        default:
          console.log("pas encore")
          break
      }
      return apiResults
    }
    const data = await apiCall()

    return {
      data,
      newItemName: data?.newItemName ?? "",
      newCover : data?.newCover ?? "",
      newItemType: data?.newItemType ?? "",
      newDateReleased: data?.newDateReleased ?? "",
      newAuthor: data?.newAuthor ?? "Anonyme",
      newOriginalName: data?.newOriginalName ?? ""
    }
  }
}