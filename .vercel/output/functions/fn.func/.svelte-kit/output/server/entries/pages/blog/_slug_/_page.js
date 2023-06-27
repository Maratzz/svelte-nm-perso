import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
async function load({ params }) {
  const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../2.md": () => import("../../../../chunks/2.js"), "../3.md": () => import("../../../../chunks/3.js"), "../apprendre-sveltekit.md": () => import("../../../../chunks/apprendre-sveltekit.js") }), `../${params.slug}.md`);
  const { title, date, categories } = post.metadata;
  const content = post.default;
  return {
    content,
    title,
    date,
    categories
  };
}
export {
  load
};
