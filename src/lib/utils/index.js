export const fetchMarkdownEverything = async () => {
  const allPostFiles = import.meta.glob( "/src/routes/*/*/*.md" )
  const iterablePostFiles = Object.entries( allPostFiles )
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(20, -3)
      return {
        meta: metadata,
        path: postPath,
      }
    })
  )
  return allPosts
}

// we take all the items and clean through Set to remove duplicates
export const removeDuplicates = async ( items ) => {
  let newArray = {}
  const jsonObject = items.map( JSON.stringify )
  const uniqueSet = new Set( jsonObject )
  newArray = Array.from( uniqueSet ).map( JSON.parse )
  return newArray
}

export const getHumanDate = async ( input ) => {
  const rawDate = new Date(input * 1000)
  const humanDate = rawDate.toISOString().substring(0, 10)
  return humanDate
}

export const formatDate = ( date ) => {
  let options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  return new Date(date).toLocaleDateString( "fr", options )
}

export const slugify = (string) => {
  string = string.replace(/^\s+|\s+$/g, '') // trim leading/trailing white space
  string = string.toLowerCase() // convert string to lowercase
  string = string
           .replace(/\p{P}+/gu, '') // replace all unicode punctuation
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-') // remove consecutive hyphens
           .replace(/é|è|ê|ë/g, 'e') // replace french accentuated e
           .replace(/à|ä|á|â/g, 'a') // replace french accentuated a
           .replace(/ù|û|ü/g, 'u') // replace french accentuated u
           .replace(/ò|ô|ö|ó|ō/g, 'o') // replace french accentuated o
           .replace(/î|ï|í/g, 'i') // replace accentuated i
           .replace(/ç/g, 'c') // replace french ç
  return string
}

export const uploadImageAndgetPublicURL = async (supabase, slug, name, type, cover, date, originalName, author) => {

  try {
    const blob = await fetch(cover).then( res => res.blob())
    const { data, error } = await supabase.storage.from("collection").upload(slug, blob)
    if ( error ) {
      throw error
    }
  } catch ( error ) {
    console.log(error)
  }

  const { data, error } = await supabase.storage.from("collection").getPublicUrl(slug)

  return {
    newItemName: name,
    newItemType: type,
    newCover: data.publicUrl,
    newDateReleased: date,
    newOriginalName: originalName,
    newAuthor: author,
    success: true
  }
}

export const multiFilteringText = (elements, categories) => {
  let filteredList = []
  elements.forEach(element => {
    let elementSet = new Set(element.meta.categories)
    let categorySet = new Set(categories)
    if (categorySet.isSubsetOf(elementSet)) {
      filteredList.push(element)
    }
  })
  return filteredList
}

export const randomNumber = (min, max) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

export const generateYears = (startYear, endYear, interval) => {
  let years = []
  for (let i = startYear; i <= endYear; i += interval){
    years.push(i)
  }
  return years
}

export const generateDataByYear = (elements, yearsGenerated, option) => {
  let data = []
  for (let index = 0; index < yearsGenerated.length; index++) {
    data.push(elements.filter(element => element.date_released >= `${yearsGenerated[index]}-01-01` && element.date_released <= `${option ? yearsGenerated[index] + option : yearsGenerated[index]}-12-31`).length)
  }
  return data
}

export const generateDataByYearFirstReleased = (elements, yearsGenerated, option) => {
  let data = []
  for (let index = 0; index < yearsGenerated.length; index++) {
    data.push(elements.filter(element => element.first_date_released >= yearsGenerated[index] && element.first_date_released <= (option ? yearsGenerated[index] + option : yearsGenerated[index])).length)
  }
  return data
}

export const generateDataByStatus = (elements, status) => {
  let data = []
  let statusArray = status.map(a => a.name)
  for (let index = 0; index < status.length; index++) {
    data.push(elements.filter(element => element.status === statusArray[index]).length)
  }
  return data
}