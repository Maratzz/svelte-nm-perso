import { PUBLIC_TWITCH_CLIENT } from '$env/static/public'
import { PRIVATE_TWITCH_SECRET } from '$env/static/private'
import { getTwitchToken } from '$lib/utils';
import { getGames } from '$lib/utils';

export const load = async () => {
  const token = await getTwitchToken(PUBLIC_TWITCH_CLIENT, PRIVATE_TWITCH_SECRET)
  const access_token = token.access_token
  const games = await getGames(PUBLIC_TWITCH_CLIENT, access_token)

  return {
    games
  }
}