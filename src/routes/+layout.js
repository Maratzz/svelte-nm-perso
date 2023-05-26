export const prerender = true;

export async function load({ data, url }) {

  const currentRoute = url.pathname

  return {
    ...data,
    currentRoute
  }
}
