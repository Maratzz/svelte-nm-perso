import { getHumanDate } from "$lib/utils/index.js"
import * as config from "$lib/config.js"
import { slugify, uploadImageAndgetPublicURL } from "$lib/utils/index.js"

export const getTwitchToken = async ( twitchClientId, twitchClientSecret ) => {
  const twitchToken = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchClientSecret}&grant_type=client_credentials`,
  { 
    method: "POST",
  })
  .then(res => res.json())
  const token = await twitchToken.access_token
  return token
}

export const getGames = async ( clientID, twitchToken, gameName, year ) => {

  try {
    let newItemName
    let newCover
    let newAuthor
    let newDateReleased
    let newItemType = "jeu vidéo"

    const data = await fetch(`${config.baseUrlIGDB}/games/`, {
      method: "POST",
      headers: {
        "Client-ID": clientID,
        Authorization: `Bearer ${twitchToken}`,
      },
      body: `fields cover.image_id,first_release_date,name,involved_companies.company.name,involved_companies.developer; where name ~ "${gameName}" & first_release_date > ${year}; sort first_release_date asc;`
    })
    .then(res => res.json())

    const newItem = await data[0]
    if ( newItem === undefined) throw "no item found"

    newItemName = newItem.name
    const dataCover = newItem.cover?.image_id ?? "nocover"
    newCover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${dataCover}.png`
    newDateReleased = await getHumanDate(newItem.first_release_date ?? "140140140")
    // we only want the developer studio, nothing else
    const gameCompanies = newItem.involved_companies ?? "Studio inconnu"
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
      newDateReleased,
      newItemType,
      success: true
    }
  } catch( error ) {
    console.error( error )
    return error
  }
}

export const getTMDBDetails = async ( apiBearerToken, input, year, type ) => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiBearerToken}`
    }
  }
  let itemID
  let newAuthor
  let newOriginalName
  let newDateReleased
  let newItemName
  let newItemType = type

  let baseURLforID = `${config.baseUrlAPITMDB}/search/${ type === "film" ? "movie" : "tv"}?query=${input}&language=fr`
  let appendYear
  if (year.length !== 0) {
    if (type === "film") {
      appendYear = `&primary_release_year=${year}`
    } else {
      appendYear = `&first_air_date_year=${year}`
    }
  } else {
    appendYear = ""
  }

  const findTMDBID = await fetch(`${baseURLforID}${appendYear}`, options)
  .then(res => res.json())
  .then( res => itemID = res.results[0].id)
  .catch( err => console.error(err) )

  if ( itemID === undefined) throw "no item found"

  const dataMovie = await fetch(`${config.baseUrlAPITMDB}/${ type === "film" ? "movie" : "tv"}/${itemID}?append_to_response=credits&language=fr`, options)
  .then(res => res.json())

  const item = await dataMovie

  newItemName = item.title ?? item.name
  newOriginalName = item.original_title ?? item.original_name
  newDateReleased = item.release_date ?? item.first_air_date
  const newCover = `https://image.tmdb.org/t/p/w342${item.poster_path}`
  if (type === "film") {
    const movieDirector = item.credits?.crew?.filter( person => person.job === "Director")
    newAuthor = movieDirector[0]?.name ?? "Anonyme"
  } else {
    newAuthor = item.created_by[0].name ?? "Anonyme"
  }

  return {
    newItemName,
    newOriginalName,
    newCover,
    newDateReleased,
    newAuthor,
    newItemType,
    success: true
  }
}

export const getAnilistDetails = async ( date, type, input ) => {

  let newItemName
  let newCover
  let newItemType = type === "anime" ? "série" : "manga"
  let newDateReleased
  let newAuthor
  let newOriginalName
  let variables = {
    search: input,
    startDateGreater: `${date.length !== 0 ? date : `1900`}0101`,
    type: type.toUpperCase(),
    isMain: true
  }

  const aniListData = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `query Query($search: String, $startDateGreater: FuzzyDateInt, $isMain: Boolean, $type: MediaType) {
        Media(search: $search, type: $type, startDate_greater: $startDateGreater) {
          id
          title {
            english
            romaji
          }
          coverImage {
            extraLarge
          }
          startDate {
            day
            month
            year
          }
          studios(isMain: $isMain) {
            nodes {
              name
            }
          }
          staff {
            nodes {
              name {
                full
              }
              primaryOccupations
            }
          }
        }
      }
      `,
      variables: variables
    })
  })
  .then(res => res.json())

  const data = aniListData.data.Media
  newItemName = data.title.english ?? data.title.romaji
  newCover = data.coverImage.extraLarge ?? ""
  newOriginalName = data.title.romaji ?? ""
  const newDate = new Date(Date.UTC(data.startDate.year, data.startDate.month-1, data.startDate.day))
  newDateReleased = newDate.toISOString().split('T')[0]
  let staff = data.staff.nodes
  let mangaka = staff.find( element => element.primaryOccupations.includes("Mangaka"))
  newAuthor = data.studios?.nodes[0]?.name ?? mangaka.name.full

  return {
    newItemName,
    newCover,
    newItemType,
    newDateReleased,
    newAuthor,
    newOriginalName
  }
}

export const getBookDetails = async (newBook, supabase) => {
  let newBookData
  let newItemName
  let newCover
  let newAuthor
  let newDateReleased
  let newItemType = "livre"
  const dataBook = await fetch(`${config.baseUrlOpenLibrarySearch}?q=${newBook}&fields=author_name,title,cover_edition_key,cover_i,first_publish_year,key,editions`, {
    method: "GET"
  })
  .then(res => res.json())

  newBookData = await dataBook.docs[0]
  newItemName = newBookData.editions.docs[0].title
  newAuthor = newBookData.author_name[0]
  newDateReleased = `${newBookData.first_publish_year}-01-01`

  let newItemSlug = await slugify(newItemName)
  let coverToDownload = `https://covers.openlibrary.org/b/id/${newBookData.editions.docs[0].cover_i}-L.jpg`

  newCover = await uploadImageAndgetPublicURL(supabase, coverToDownload, newItemSlug)

  return {
    newItemType,
    newItemName,
    newAuthor,
    newCover,
    newDateReleased,
    success: true
  }
}