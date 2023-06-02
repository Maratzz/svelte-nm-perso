export const load = async () => {
  const options = {
    method: 'POST',
    headers: {
      cookie: '__cf_bm=shzJ7CtzTrTl9IHefIk35hXBZXYKSoadRwNB0_dpLzw-1685699992-0-Ae8%2FK3n8S%2FGSmDv%2FAnfy4idQSDwS213X2Mw3Y3wpAgvD3nZ98klPfy8tFVz3UM830Ne5t75%2FPq2wSvhX9KjKhe0%3D',
      'Content-Type': 'application/json',
      'Client-ID': 'wpby8vnv85n44vc14asegvshmwwgi0',
      Authorization: 'Bearer u0g918mv04m213rbkg86dso4mpuiug'
    },
    body: 'fields *;'
  };
  const twitchRes = await fetch('https://api.igdb.com/v4/games', options).catch(err => console.error(err))
  const games = await twitchRes.json()

  return {
    games
  }
}