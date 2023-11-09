import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
      const form = await request.formData()
      const newGame = form.get('new-game')
      const newPlatform = form.get('new-platform')
      const newStatus = form.get('new-status')

      if (!newGame) {
        return fail(400, { newGame, missing: true })
      }
      console.log(newGame, newPlatform, newStatus)

      return { success: true, newGame, newPlatform, newStatus }
    
  }
}