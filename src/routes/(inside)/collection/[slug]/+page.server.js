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
    if ( !updatedDateStarted ) {
      updatedDateStarted = null
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

  add_dates: async ({params, request, locals: { supabase, safeGetSession}}) => {

    const session = await safeGetSession()

    let form = await request.formData()
    let itemID = form.get( "item_ID" )
    let newDateStarted = form.get( "newDateStarted" )
    let newDateFinished = form.get( "newDateFinished" )
    let newStatus = form.get( "newStatus" )

    if ( !session ) {
      redirect(303, "/connexion")
    }

    console.log("item id:" + itemID)
    console.log("new date started: " + newDateStarted)
    console.log("new date finished: " + newDateFinished)
    console.log("status: " + newStatus)

    const allTheDates = await supabase
      .from("collection_date_joined")
      .select("*")
      .eq("oeuvre_id", itemID)
    console.log("toutes les dates:", allTheDates)
    let lastDateStart
    let lastDate
    if (allTheDates !== []) {
      lastDate = allTheDates.data[allTheDates.data.length - 1]
      lastDateStart = lastDate.date_started
    }
    console.log("dernière date:", lastDateStart)

    if (lastDateStart == newDateStarted) {
      console.log("même date")
    } else {
      console.log("pas la même, il en faut une nouvelle")
    }
  }
}