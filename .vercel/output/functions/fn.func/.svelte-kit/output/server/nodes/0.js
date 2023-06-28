import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.c2310403.js","_app/immutable/chunks/singletons.ec0928d8.js","_app/immutable/chunks/index.65028fb2.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/navigation.90715cf9.js"];
export const stylesheets = ["_app/immutable/assets/0.178fa74c.css"];
export const fonts = [];
