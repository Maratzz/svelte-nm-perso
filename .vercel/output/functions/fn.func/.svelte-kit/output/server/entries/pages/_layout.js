import "../../chunks/singletons.js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "../../chunks/public.js";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
async function load({ fetch, data, depends, url }) {
  depends("supabase:auth");
  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session
  });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const currentRoute = url.pathname;
  return { supabase, session, currentRoute };
}
export {
  load
};
