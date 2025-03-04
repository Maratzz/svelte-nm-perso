import { redirect } from "@sveltejs/kit"

export const actions = {
  update: async ({ params, request, locals: { supabase, safeGetSession}}) => {
    const session = await safeGetSession()

    if (!session) {
      redirect(303, "/connexion")
    }

    let form = await request.formData()
    let updatedElsewhereLocation = form.get( "maintenant_elsewhere_location" )
    let updatedElsewhereReason = form.get( "maintenant_elsewhere_reason" )
    let updatedWriting = form.get( "maintenant_writing" )
    let updatedJobs = form.get( "maintenant_jobs" )
    let elsewhereBool = false
    let webdev_open = true

    if (updatedElsewhereLocation !== null) {
      elsewhereBool = true
    }
  }
}