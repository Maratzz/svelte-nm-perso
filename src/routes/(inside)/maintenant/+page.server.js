import { redirect } from "@sveltejs/kit"

export const actions = {

  update: async ({ request, locals: { supabase, safeGetSession}}) => {
    const session = await safeGetSession()

    if (!session) {
      redirect(303, "/connexion")
    }

    //used to refresh the "last updated + date" mention at the bottom of the page
    let dateNow = Date.now()
    let ISOdateNow = new Date(dateNow).toISOString()

    let form = await request.formData()
    let updatedHome = form.get( "maintenant_home" )
    let updatedElsewhereLocation = form.get( "maintenant_elsewhere_location" )
    let updatedElsewhereReason = form.get( "maintenant_elsewhere_reason" )
    let updatedWriting = form.get( "maintenant_writing" )
    let updatedJobs = form.get( "maintenant_jobs" )

    try {
      const { newForm, error } = await supabase
        .from("maintenant")
        .update([
          {
            home: updatedHome,
            updated_at: ISOdateNow,
            jobs: updatedJobs,
            writing: updatedWriting !== "" ? updatedWriting : null,
            elsewhere_bool: updatedElsewhereLocation !== "" ? true : false,
            elsewhere_location: updatedElsewhereLocation,
            elsewhere_reason: updatedElsewhereReason
          }
        ])
        .eq("id", 1)
        .select()
      if ( error ) {
        throw error
      }
      return { newForm }
    } catch ( error ) {
      console.log( error || error.message)
      return error
    }
  }
}