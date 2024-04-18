export async function load({ params }){
  const posts = import.meta.glob("../*.md")
  const post = await posts[`../${params.slug}.md`]()
  const { title, date, categories, headline } = post.metadata
  const content = post.default

  return {
    content,
    title,
    date,
    categories,
    headline
  }
}