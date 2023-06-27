import { r as redirect } from "../../../chunks/index.js";
async function load({ url, locals: { getSession } }) {
  const session = await getSession();
  if (session) {
    throw redirect(303, "/compte");
  }
  return { url: url.origin };
}
export {
  load
};
