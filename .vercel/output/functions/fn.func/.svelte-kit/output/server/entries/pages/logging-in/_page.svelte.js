import { c as create_ssr_component, a as subscribe } from "../../../chunks/index3.js";
import "../../../chunks/singletons.js";
import { p as page } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      $page.url.searchParams.get("redirect");
    }
  }
  $$unsubscribe_page();
  return `


<section>&quot;Because as we know, there are known knowns; there are things we know we know. We also know there
	are known unknowns; that is to say we know there are some things we do not know. But there are
	also unknown unknowns—the ones we don&#39;t know we don&#39;t know&quot; - Donald Rumsfeld
</section>`;
});
export {
  Page as default
};
