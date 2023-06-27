import * as universal from '../entries/pages/blog/_slug_/_page.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/4.81ac045f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/dynamic-import-helper.be004503.js","_app/immutable/chunks/index.65028fb2.js"];
export const stylesheets = [];
export const fonts = [];
