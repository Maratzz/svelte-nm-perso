import { redirect } from "@sveltejs/kit"

export const actions = {
  //TODO: delete this part after tierlist implementation is done
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
  },

  insertNewTier: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const form = await request.formData()

    const newTierName = form.get("tier_to_add")
    const newColor = form.get("color_for_new_tier")
    const newOrder = form.get("tier_order")
    const tierlistID = form.get("tierlist")

    if ( !session ) {
      redirect(303, "/connexion")
    }

    try {
      const { newForm, error} = await supabase
        .from("tiers")
        .insert([
          {
            tier_list_id: tierlistID,
            order: newOrder,
            color: newColor,
            name: newTierName
          }
        ])
        .select()
        if (error) {
          throw new Error(error)
        }
        //TODO: check if this is still needed/useful? Why did I put it in the first place?
        const supabaseResponse = await newForm
        return { newForm, supabaseResponse }
    } catch (error) {
      console.log( error || error.message)
      return error
    }
  }
}