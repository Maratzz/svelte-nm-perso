export const fetchMarkdownEverything = async () => {
  const allPostFiles = import.meta.glob('/src/routes/*/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)
  
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(11, -3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )

  return allPosts
}

// we take all the items and clean through Set to remove duplicates
export const removeDuplicates = async (items) => {
  let newArray = {}
  const jsonObject = items.map(JSON.stringify)
  const uniqueSet = new Set(jsonObject)
  newArray = Array.from(uniqueSet).map(JSON.parse)
  return newArray
}