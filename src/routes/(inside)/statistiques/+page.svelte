<script>

  export let data
  let { collection } = data

  let DateStart = '2025-01-01'
  let DateEnd = '2025-12-31'

  let filmSoFar = collection.filter(item => item.item_type === "film" && item.date_started >= DateStart)
  let gameSoFar = collection.filter(item => item.item_type === "jeu vidéo" && item.date_started >= DateStart)
  let bookSoFar = collection.filter(item => item.item_type === "livre" && item.date_started >= DateStart)
  let bdSoFar = collection.filter(item => item.item_type === "bande dessinée" && item.date_started >= DateStart)
  let mangaSoFar = collection.filter(item => item.item_type === "manga" && item.date_started >= DateStart)
</script>

<div>
  <h1>Statistiques</h1>

  <p>une page avec plein de stats</p>

  <p>Pour l'instant en 2025:</p>
  <p>j'ai vu {filmSoFar.length} films</p>
  <p>j'ai joué à {gameSoFar.length} jeux vidéo</p>
  <p>j'ai lu {bookSoFar.length} livres</p>
  <p>j'ai lu {bdSoFar.length} {bdSoFar.length === 0 || bdSoFar.length === 1 ? 'bande dessinée' : 'bandes dessinées'}</p>
  <p>j'ai lu {mangaSoFar.length} {mangaSoFar.length === 1 ? 'manga' : 'mangas'}</p>
</div>