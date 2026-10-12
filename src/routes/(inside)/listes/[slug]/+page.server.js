import { redirect } from "@sveltejs/kit"
import { fail } from "@sveltejs/kit"

export const actions = {

  insertNewTier: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    if ( !session ) {
      redirect(303, "/connexion")
    }

    const form = await request.formData()
    const newTierName = form.get("tier_to_add")
    const newColor = form.get("color_for_new_tier")
    const newOrder = form.get("tier_order")
    const tierlistID = form.get("tierlist")

    const { data: newTier, error } = await supabase
      .from("tiers")
      .insert([{
        tier_list_id: tierlistID,
        order: newOrder,
        color: newColor,
        name: newTierName
      }])
      .select()
      .single()

    if (error) {
      return fail(400, { error: error.message })
    }
    return { newTier }
  },

  insertDefaultTiers: async ({ request, locals: { supabase, safeGetSession }}) => {
    const session = await safeGetSession()
    const form = await request.formData()

    const tierlistID = form.get("tierlist")

    const defaultTiers = [
      { tier_list_id: tierlistID, order: "10", color: "#8FF0A4", name: "top" },
      { tier_list_id: tierlistID, order: "20", color: "#F9F06B", name: "okay" },
      { tier_list_id: tierlistID, order: "30", color: "#FFBE6F", name: "bof" },
      { tier_list_id: tierlistID, order: "40", color: "#F66151", name: "non" }
    ]

    if ( !session ) {
      redirect(303, "/connexion")
    }

    for ( const tier of defaultTiers ) {
      const { error } = await supabase
        .from("tiers")
        .insert(tier)

      if ( error ) {
        console.error("erreur dans la création des tiers par défaut:", error)
        alert("erreur:", error)
      }
    }
  }
}