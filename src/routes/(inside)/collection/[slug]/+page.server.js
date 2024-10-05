import { redirect } from "@sveltejs/kit"

export const actions = {

  addToList: async ({ params, request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const slug = params.slug
    const form = await request.formData()
    const newList = form.get( "new_list" )

    if ( !session ) {
      redirect(303, "/connexion")
    }

    try {
      const { newForm, error } = await supabase
        .from("collection_lists_m2m")
        .insert([
          {
            "collection_slug": slug,
            "list_slug": newList
        }])
      if (error) {
        throw error
      }
      return { newForm, supabaseResponse }
    } catch( error ) {
      console.error( error | error.message )
    }
  }
}