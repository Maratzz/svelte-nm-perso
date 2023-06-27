import { j as json } from "../../../../chunks/index.js";
const fetchMarkdownEverything = async () => {
  const allPostFiles = /* @__PURE__ */ Object.assign({ "/src/routes/blog/2.md": () => import("../../../../chunks/2.js"), "/src/routes/blog/3.md": () => import("../../../../chunks/3.js"), "/src/routes/blog/apprendre-sveltekit.md": () => import("../../../../chunks/apprendre-sveltekit.js"), "/src/routes/textes/2.md": () => import("../../../../chunks/22.js"), "/src/routes/textes/blasphemous.md": () => import("../../../../chunks/blasphemous.js") });
  const iterablePostFiles = Object.entries(allPostFiles);
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice(11, -3);
      return {
        meta: metadata,
        path: postPath
      };
    })
  );
  return allPosts;
};
const GET = async () => {
  const allPosts = await fetchMarkdownEverything();
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.meta.date) - new Date(a.meta.date);
  });
  return json(sortedPosts);
};
export {
  GET
};
