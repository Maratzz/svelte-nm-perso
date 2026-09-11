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
    let updatedNotes = form.get( "item_notes" )
    let updatedTags = form.get( "item_tags" )
    let updatedHiddenTags = form.get( "item_hidden_tags" )
    let updatedAuthors = form.get( "item_author" )
    let isApproved = form.get("is_approved") ?? null
    let tags
    let hidden_tags
    let authors = updatedAuthors.split( "," )

    let dateNow = Date.now()
    let ISOdateNow = new Date(dateNow).toISOString()

    if ( !session ) {
      redirect(303, "/connexion")
    }
    if ( !updatedTags ) {
      tags = null
    } else {
      tags = updatedTags.split( "," )
    }
    if ( !updatedHiddenTags) {
      hidden_tags = null
    } else {
      hidden_tags = updatedHiddenTags.split( "," )
    }

    try {
      const { newForm, error } = await supabase
        .from("collection")
        .update([
          {
            date_acquired: updatedDateAcquired,
            notes: updatedNotes,
            date_updated: ISOdateNow,
            tags: tags,
            hidden_tags: hidden_tags,
            author: authors,
            is_approved: isApproved
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
  },

  add_dates: async ({ request, locals: { supabase, safeGetSession }}) => {

    const session = await safeGetSession()

    //on récupère les données du formulaire
    let form = await request.formData()
    const itemID = form.get( "item_ID" )
    let newDateStarted = form.get( "newDateStarted" )
    if (!newDateStarted) { newDateStarted = null }
    let newDateFinished = form.get( "newDateFinished" )
    if (!newDateFinished) { newDateFinished = null }
    let newStatus = form.get( "newStatus" )
    if ( !session ) {
      redirect(303, "/connexion")
    }

    //on regarde si il y a déjà des paires de date associées à l'oeuvre
    const allTheDates = await supabase
      .from("collection_dates")
      .select("*")
      .eq("oeuvre_id", itemID)

    let lastDate = allTheDates?.data?.at(-1)
    let lastDateStart = lastDate?.date_started ?? null

    //on check pour update une ligne déjà existante ou en créer une nouvelle sur la base de la date de début
    if (allTheDates.data.length && (lastDateStart === newDateStarted || lastDateStart === null)) {
      const updateLastDatePairing = await supabase
        .from("collection_dates")
        .update([
          {
            date_started: newDateStarted,
            date_finished: newDateFinished,
            status: newStatus
          }
        ])
        .eq('id', lastDate.id)
        .select()
    } else {
      const createNewDatePairing = await supabase
        .from("collection_dates")
        .insert([
          {
            oeuvre_id: itemID,
            date_started: newDateStarted,
            date_finished: newDateFinished,
            status: newStatus
          }
        ])
        .select()
    }
  }
}