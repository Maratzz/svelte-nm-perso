import { PRIVATE_TMDB_BEARER } from "$env/static/private"

import { searchMovieByName } from "$lib/utils/index.js"

export const actions = {

  search: async ({ request, fetch }) => {
    const form = await request.formData()
    let movieName = form.get( "item_name" )
    
    try {
      const data = await searchMovieByName( PRIVATE_TMDB_BEARER, movieName)

      return {
        data,
        success: true
      }
    } catch(error) {
      console.error(error)
    }
  }

}