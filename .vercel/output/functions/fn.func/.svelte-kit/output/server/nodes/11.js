import * as server from '../entries/pages/protected/_page.server.js';

export const index = 11;
export const component = async () => (await import('../entries/pages/protected/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/protected/+page.server.js";
export const imports = ["_app/immutable/nodes/11.f2a1d154.js","_app/immutable/chunks/index.65028fb2.js"];
export const stylesheets = ["_app/immutable/assets/11.0a15a45c.css"];
export const fonts = [];
