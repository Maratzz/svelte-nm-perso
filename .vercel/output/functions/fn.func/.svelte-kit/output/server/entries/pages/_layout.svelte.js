import { c as create_ssr_component, v as validate_component } from "../../chunks/index3.js";
import "../../chunks/singletons.js";
const code_formatter = "";
const styles = "";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav><ul><li><a href="/">Accueil</a></li>
    <li><a href="/textes">Textes</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/info">Info</a></li>
    <li><a href="/protected">Mon compte</a></li></ul></nav>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="footer"><ul><li><a href="/mentions">Mentions légales</a></li>
    <li><a href="/credits">Crédits</a></li>
    <li><a href="/site-pro">Site pro</a></li>
    <li><a href="/soutien">Soutenez-moi</a></li></ul></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main>${slots.default ? slots.default({}) : ``}</main>
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
