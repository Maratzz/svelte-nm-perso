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
      const supabaseResponse = await newForm
      return { newForm, supabaseResponse }
    } catch( error ) {
      console.error( error | error.message )
    }
  },

  update: async ({ params, request, locals: { supabase, safeGetSession }}) => {

    const session = await safeGetSession()

    let itemSlug = params.slug
    let form = await request.formData()
    let updatedDateAcquired = form.get( "item_date_acquired" )
    let updatedDateStarted = form.get( "item_date_started" )
    let updatedDateFinished = form.get( "item_date_finished" )
    let updatedStatus = form.get( "item_status" )
    let updatedNotes = form.get( "item_notes" )

    let dateNow = Date.now()
    let ISOdateNow = new Date(dateNow).toISOString()

    if ( !session ) {
      redirect(303, "/connexion")
    }
    if ( !updatedDateStarted ) {
      updatedDateStarted = null
    }
    if ( !updatedDateFinished) {
      updatedDateFinished = null
    }
    if ( !updatedDateAcquired ) {
      updatedDateAcquired = null
    }

    try {
      const { newForm, error } = await supabase
        .from("collection")
        .update([
          {
            date_acquired: updatedDateAcquired,
            date_started: updatedDateStarted,
            date_finished: updatedDateFinished,
            status: updatedStatus,
            notes: updatedNotes,
            date_updated: ISOdateNow
          }
        ])
        .eq("slug", itemSlug)
        .select()
      if ( error ) {
        throw error
      }
      const supabaseResponse = await newForm
      return { newForm, supabaseResponse }
    } catch( error ) {
      console.log( error | error.message )
      return error
    }
  }
}