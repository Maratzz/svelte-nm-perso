import { fail, redirect } from '@sveltejs/kit'
import toast, { Toaster } from 'svelte-french-toast'


export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {

      const session = await getSession()
      const user = session.user.id

      const form = await request.formData()
      const newGame = form.get('new-game')
      const newPlatform = form.get('new-platform')
      const newStatus = form.get('new-status')

      if (!newGame) {
        return fail(400, { newGame, missing: true })
      }
      
      if (session) {
        const newForm = await supabase
        .from('games')
        .insert([
          {name: newGame, platform: newPlatform}
        ])
        .select()

        const formStatus = await newForm.status

        console.log(formStatus)
  
        return { newForm, formStatus }
      }

  }
}