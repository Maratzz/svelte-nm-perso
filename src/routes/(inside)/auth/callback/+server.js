// src/routes/auth/callback/+server.js
// As we are employing Proof Key for Code Exchange (PKCE) in our authentication flow, it is necessary to create a server endpoint responsible for exchanging the code for a session.

import { redirect } from "@sveltejs/kit"

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  if ( code ) {
    await supabase.auth.exchangeCodeForSession( code )
  }
  throw redirect( 303, "/compte" )
}
