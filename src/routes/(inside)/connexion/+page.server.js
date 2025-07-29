import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ url, locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  //if the user is already logged in return them to the account page
  if ( session ) {
    redirect(303, '/compte')
  }

  return { url: url.origin }
}

export const actions = {
  login: async ({ request, locals: { supabase }}) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: '/connexion/callback',
      },
    })
    if ( error ) {
      redirect(303, '/connexion/erreur')
    }
    if ( data.url ) {
      redirect(303, data.url) // use the redirect API for your server framework
    }

  }
}