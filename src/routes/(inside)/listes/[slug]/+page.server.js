import { redirect } from "@sveltejs/kit"

export const actions = {

  insert: async ({ params, request, locals: { supabase, safeGetSession }}) => {
    const listToAdd = params.slug
    const session = await safeGetSession()
    const form = await request.formData()
    const itemToAdd = form.get( "item_to_add" )

    if ( !session ) {
      redirect(303, "/connexion")
    }

    if ( !itemToAdd ) {
      throw new Error("item missing!")
    }

    try {
      const { newForm, error } = await supabase
        .from("collection_lists_m2m")
        .insert([
          {
            collection_slug: itemToAdd,
            list_slug: listToAdd
          }
        ])
        .select()
        if (error) {
          throw new Error(error)
        }
        const supabaseResponse = await newForm
        return { newForm, supabaseResponse }
    } catch( error ) {
      console.error( error | error.message )
      return error
    }
  }
}