export const fetchMarkdownEverything = async () => {
  const allPostFiles = import.meta.glob( "/src/routes/*/*/*.md" )
  const iterablePostFiles = Object.entries( allPostFiles )
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(20, -3)
      return {
        meta: metadata,
        path: postPath,
      }
    })
  )
  return allPosts
}

// we take all the items and clean through Set to remove duplicates
export const removeDuplicates = async ( items ) => {
  let newArray = {}
  const jsonObject = items.map( JSON.stringify )
  const uniqueSet = new Set( jsonObject )
  newArray = Array.from( uniqueSet ).map( JSON.parse )
  return newArray
}

// generate a twitch token on the fly
// TODO perhaps we should store it somewhere and check if there is one, if not then we generate a new one and store it, so that way there are less API calls, but does it actually matter ? search info about it schlok
export const getTwitchToken = async ( twitchClientId, twitchClientSecret ) => {
  const twitchToken = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchClientSecret}&grant_type=client_credentials`,
  { 
    method: "POST",
  })
  const token = twitchToken.json()
  return token
}

export const getGames = async ( clientID, twitchToken, gameName ) => {
  const data = await fetch("https://api.igdb.com/v4/games/", {
    method: "POST",
    headers: {
      "Client-ID": clientID,
      Authorization: `Bearer ${twitchToken}`,
    },
    body: `fields cover.image_id,first_release_date,name,involved_companies.company.name,involved_companies.developer; where name ~ "${gameName}";sort first_release_date asc;`
  })
  const res = await data.json()
  return res
}

// TODO check if it"s still used and/or useful, and delete it not
export const getGameCover = async ( clientID, twitchToken, input ) => {
  const data = await fetch("https://api.igdb.com/v4/covers", {
    method: "POST",
    headers: {
      "Client-ID": clientID,
      Authorization: `Bearer ${twitchToken}`,
    },
    body: `fields *; where game = ${input};`
  })
  const res = await data.json()
  const gameCoverUrl = res[0].image_id
  return gameCoverUrl
}

export const getHumanDate = async ( input ) => {
  const rawDate = new Date(input * 1000)
  const humanDate = rawDate.toISOString().substring(0, 10)
  return humanDate
}

export const formatDate = ( date, dayChoice, monthChoice, yearChoice ) => {
  let options = {
    day: dayChoice,
    month: monthChoice,
    year: yearChoice
  }
  return new Date(date).toLocaleDateString( "fr", options )
}

export const slugify = (string) => {
  string = string.replace(/^\s+|\s+$/g, '') // trim leading/trailing white space
  string = string.toLowerCase() // convert string to lowercase
  string = string
           .replace(/\p{P}+/gu, '') // replace all unicode punctuation
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-') // remove consecutive hyphens
           .replace(/éèêë/g, 'e') // replace french accentuated e
           .replace(/àäá/g, 'a') // replace french accentuated a
           .replace(/ùûü/g, 'u') // replace french accentuated u
           .replace(/òôöó/g, 'o') // replace french accentuated o
           .replace(/ç/g, 'c') // replace french ç
           .replace(/&/g, 'and') // replace &
  return string
}