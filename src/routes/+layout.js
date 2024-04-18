import { invalidate } from "$app/navigation"
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit"

export const load = async ({ fetch, data, depends, url }) => {
  depends("supabase:auth")

  // create a supabase client to use supabase in shared load functions (passed down in children layout.svelte and page.svelte)
  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const currentRoute = url.pathname

  return { supabase, session, currentRoute }
}
