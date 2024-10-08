import { redirect } from "@sveltejs/kit"
import { slugify } from "$lib/utils/index.js"

export const actions = {

  insert: async ({ request, locals: { supabase, safeGetSession } }) => {

    const session = await safeGetSession()
    const form = await request.formData()
    const newName = form.get( "new_list" )
    const newDescription = form.get( "new_description" )
    const newSlug = await slugify(newName)

    if ( !session ) {
      redirect(303, "/")
    }

    try {
      const {newForm, error } = await supabase
        .from("lists")
        .insert([
          {
            slug: newSlug,
            name: newName,
            description: newDescription
          }
        ])
        .select()
        const supabaseResponse = await newForm
        return { newForm, supabaseResponse }
    } catch( error ) {
      console.log(error | error.message)
      return error
    }
  }
}