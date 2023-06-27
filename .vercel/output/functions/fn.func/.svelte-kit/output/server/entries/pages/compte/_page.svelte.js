import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index3.js";
import "devalue";
import "../../../chunks/singletons.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let { session, supabase, profile } = data;
  let profileForm;
  let fullName = profile?.full_name ?? "";
  let username = profile?.username ?? "";
  let website = profile?.website ?? "";
  profile?.avatar_url ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `


<div><form method="post" action="?/update"${add_attribute("this", profileForm, 0)}><div><label for="email">Email</label>
			<input id="email" type="text"${add_attribute("value", session.user.email, 0)} disabled></div>

		<div><label for="fullName">Nom complet</label>
			<input id="fullName" name="fullName" type="text"${add_attribute("value", form?.fullName ?? fullName, 0)}></div>

		<div><label for="username">Pseudo</label>
			<input id="username" name="username" type="text"${add_attribute("value", form?.username ?? username, 0)}></div>

		<div><label for="website">Website</label>
			<input id="website" name="website" type="url"${add_attribute("value", form?.website ?? website, 0)}></div>

		<div><input type="submit"${add_attribute("value", "Mettre à jour", 0)} ${""}></div></form>

	<form method="post" action="?/signout"><div><button ${""}>Déconnexion</button></div></form></div>`;
});
export {
  Page as default
};
