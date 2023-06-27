import * as universal from '../entries/pages/blog/_page.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/blog/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/+page.js";
export const imports = ["_app/immutable/nodes/3.5cfc2a13.js","_app/immutable/chunks/index.65028fb2.js"];
export const stylesheets = [];
export const fonts = [];
