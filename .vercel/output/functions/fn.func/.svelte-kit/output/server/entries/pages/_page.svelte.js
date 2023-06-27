import { c as create_ssr_component } from "../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Bienvenue</h1>

<p>Un site en construction, pour découvrir Svelte, SvelteKit et toutes les nouvelles technologies <i>des cool kids</i>.</p>
<p>Chaque étape sera documentée, d&#39;abord pour me faire des notes futures et ensuite parce que j&#39;en ai marre de toujours tomber sur de la documentation obsolète, incorrecte ou tout simplement inutilisable, surtout quand ça concerne les frameworks des <i>cool kids</i>, qui sont cool mais apparemment pas suffisamment cool pour prendre le temps de documenter leurs nouveaux jouets.</p>
<p>En faisant ça je m&#39;exclue peut-être d&#39;office du club des <i>cool kids</i>. C&#39;est okay. J&#39;ai toujours préféré être <i>hot</i> en fait.</p>

${data.supabase ? `<p>Bravo, tu es connecté·e sur Supabase!</p>` : `<p>Oh non, tu n&#39;es pas connecté·e!</p>`}`;
});
export {
  Page as default
};
