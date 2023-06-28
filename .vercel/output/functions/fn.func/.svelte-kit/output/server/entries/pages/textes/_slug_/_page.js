import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
async function load({ params }) {
  const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../2.md": () => import("../../../../chunks/22.js"), "../blasphemous.md": () => import("../../../../chunks/blasphemous.js") }), `../${params.slug}.md`);
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
