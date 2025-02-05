/* async function fetchImage(url) {
  const data = await fetch(url)
  .then(response => response.blob())
  return { data }
}



async function uploadFile(url) {

  let image = await fetch(url)
  .then(response => image = response.blob())

  const { data, error } = await supabase.storage.from('collection').upload('example_name', image)
  if (error) {
    console.log("erreur:", error)
  } else {
    console.log("upload complete")
  }
} */