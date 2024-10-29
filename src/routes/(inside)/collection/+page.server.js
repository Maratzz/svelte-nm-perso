import { redirect } from "@sveltejs/kit"
import { PUBLIC_TWITCH_CLIENT } from "$env/static/public"
import { PRIVATE_TWITCH_SECRET } from "$env/static/private"
import { PRIVATE_TMDB_BEARER } from "$env/static/private"
import { getTwitchToken, getHumanDate, getGames, slugify, getMovieDetails } from "$lib/utils/index.js"

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

  searchGameDB: async ({ request }) => {
    const token = await getTwitchToken( PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET )
    const access_token = token.access_token
    const form = await request.formData()
    let newItemName = form.get( "item_name" )
    const gameString = newItemName.toString()
    let newItemType

    try {
      // all the info about a game
      const gameData = await getGames( PUBLIC_TWITCH_CLIENT, access_token, gameString )
      const newItem = gameData[0]
      if ( newItem === undefined ) throw "no game found"
      newItemName = newItem.name
      newItemType = "jeu vidéo"
      const gameCover = newItem.cover?.image_id ?? "nocover"
      const newCover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover}.png`
      const newDateReleased = await getHumanDate(newItem.first_release_date ?? "140140140")
      // we only want the developer studio, nothing else
      const gameCompanies = newItem.involved_companies ?? "Studio inconnu"
      let newAuthor
      if (gameCompanies !== "Studio inconnu") {
        const gameDevCompany = gameCompanies.filter( company => company.developer === true )
        newAuthor = gameDevCompany[0].company.name
      } else {
        newAuthor = "Studio inconnu"
      }

      return {
        newItemName,
        newAuthor,
        newCover,
        newItemType,
        newDateReleased,
        success: true }

    } catch( error ) {
      console.log(error.message)
      return error
    }
  },

  searchMovieDB: async ({ request }) => {
    const form = await request.formData()
    let newItemName = form.get( "item_name" ).toString()
    let newAuthor
    let newOriginalName
    let newItemType

    try {
      const movieData = await getMovieDetails(PRIVATE_TMDB_BEARER, newItemName)
      newItemName = movieData.title
      newOriginalName = movieData.original_title
      const newCover = `https://image.tmdb.org/t/p/w342${movieData.poster_path}`
      const newDateReleased = movieData.release_date
      const movieDirector = movieData.credits.crew.filter( person => person.job === "Director")
      newAuthor = movieDirector[0].name
      newItemType = "film"

      return {
        newItemName,
        newCover,
        newItemType,
        newDateReleased,
        newAuthor,
        newOriginalName,
        success: true
      }
    } catch( error ) {
      console.log(error.message || error)
      return error
    }

  },

  searchAnimeDB: async ({ request }) => {
    const form = await request.formData()
    let newItemName = form.get( "item_name" ).toString()
    let newDateGreater = form.get( "item_date_greater").toString() ?? "1900"
    let newItemType
    let newOriginalName
    let newCover

    try {
      let variables = {
        search: newItemName,
        startDateGreater: `${newDateGreater}0101`
      }
      const animeData = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query Query($search: String, $startDateGreater: FuzzyDateInt) {
            Media(search: $search, type: ANIME, startDate_greater: $startDateGreater) {
              id
              title {
                english
                romaji
              }
              coverImage {
                large
              }
              startDate {
                day
                month
                year
              }
            }
          }
          `,
          variables: variables
        })
      })
      .then(res => res.json())
      const data = animeData.data.Media
      newItemName = data.title.english
      newOriginalName = data.title.romaji
      newCover = data.coverImage.large
      const newDate = new Date(Date.UTC(data.startDate.year, data.startDate.month-1, data.startDate.day))
      console.log(newDate)
      const newDateReleased = newDate.toISOString().split('T')[0]

      console.log("type:", typeof(newDateReleased), "result:", newDateReleased)
      newItemType = "série"
      return {
        newItemType,
        newItemName,
        newOriginalName,
        newCover,
        newDateReleased
      }
    } catch(error) {
      console.log(error)
      return error
    }
  }
}