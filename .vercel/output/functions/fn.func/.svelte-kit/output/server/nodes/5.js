import * as server from '../entries/pages/compte/_page.server.js';

export const index = 5;
export const component = async () => (await import('../entries/pages/compte/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/compte/+page.server.js";
export const imports = ["_app/immutable/nodes/5.74ab29ff.js","_app/immutable/chunks/index.65028fb2.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.ec0928d8.js","_app/immutable/chunks/navigation.90715cf9.js"];
export const stylesheets = [];
export const fonts = [];
