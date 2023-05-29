// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit'

export async function load ({ url, locals: { getSession } }) {
  const session = await getSession()

  // if the user is already logged in return them to the account page
  if (session) {
    throw redirect(303, '/compte')
  }

  return { url: url.origin }
}
