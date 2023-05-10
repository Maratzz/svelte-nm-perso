export const load = async ({ fetch }) => {
  const response = await fetch(`/api/textes`)
  const posts = await response.json()

  return {
    posts
  }
}