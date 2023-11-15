export const fetchMarkdownEverything = async () => {
  const allPostFiles = import.meta.glob('/src/routes/*/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)
  
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(11, -3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )

  return allPosts
}

// we take all the items and clean through Set to remove duplicates
export const removeDuplicates = async (items) => {
  let newArray = {}
  const jsonObject = items.map(JSON.stringify)
  const uniqueSet = new Set(jsonObject)
  newArray = Array.from(uniqueSet).map(JSON.parse)
  return newArray
}

// generate a twitch token on the fly
// TODO perhaps we should store it somewhere and check if there is one, if not then we generate a new one and store it, so that way there are less API calls, but does it actually matter ? search info about it schlok
export const getTwitchToken = async (twitchClientId, twitchClientSecret) => {
  const twitchToken = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchClientSecret}&grant_type=client_credentials`,
  { 
    method: 'POST',
  })
  const token = twitchToken.json()
  return token
}

export const getGames = async (clientID, twitchToken, gameName) => {
  const data = await fetch('https://api.igdb.com/v4/games/', {
    method: 'POST',
    headers: {
      'Client-ID': clientID,
      Authorization: `Bearer ${twitchToken}`,
    },
    body: `fields *; where name = "${gameName}";`
  })
  const res = await data.json()
  return res
}

export const getGameCover = async (clientID, twitchToken, input) => {
  const data = await fetch('https://api.igdb.com/v4/covers', {
    method: 'POST',
    headers: {
      'Client-ID': clientID,
      Authorization: `Bearer ${twitchToken}`,
    },
    body: `fields *; where game = ${input};`
  })
  const res = await data.json()
  const gameCoverUrl = res[0].image_id
  return gameCoverUrl
}

export const getHumanDate = async (input) => {
  const rawDate = new Date(input * 1000)
  const humanDate = rawDate.toISOString().substring(0, 10)
  return humanDate
}