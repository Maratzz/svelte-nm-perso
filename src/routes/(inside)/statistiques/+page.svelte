<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"
  import CultureItemStats from "$lib/components/CultureItemStats.svelte"
  import { generateYears, generateDataByYear, generateDataByStatus, generateDataByYearFirstReleased } from "$lib/utils/index.js"

  export let data
  let { collection, status } = data

  let currentDate = new Date(Date.now())
  let currentYear = currentDate.getFullYear()
  let DateStart = `${currentYear}-01-01`

  let films = collection.filter(item => item.item_type === "film")
  let games = collection.filter(item => item.item_type === "jeu vidéo")
  let books = collection.filter(item => item.item_type === "livre")

  let filmSoFar = collection.filter(item => item.item_type === "film" && item.date_started >= DateStart)
  let gameSoFar = collection.filter(item => item.item_type === "jeu vidéo" && item.date_started >= DateStart)
  let bookSoFar = collection.filter(item => item.item_type === "livre" && item.date_started >= DateStart)
  let bdSoFar = collection.filter(item => item.item_type === "bande dessinée" && item.date_started >= DateStart)
  let mangaSoFar = collection.filter(item => item.item_type === "manga" && item.date_started >= DateStart)

</script>

<HeadSEO
  title="Nico Moisson | Statistiques"
  description="J'espère que quand on meurt on a un récapitulatif statistiques sur toute notre vie, et un leaderboard mondial"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>
  <h1>Statistiques</h1>

  <p>une page avec plein de stats</p>

  <p>Pour l'instant en {currentYear}:</p>
  <p>j'ai vu {filmSoFar.length} {filmSoFar.length === 0 || filmSoFar.length === 1 ? 'film' : 'films'}</p>
  <p>j'ai joué à {gameSoFar.length} {gameSoFar.length === 0 || gameSoFar.length === 1 ? 'jeu vidéo' : 'jeux vidéo'}</p>
  <p>j'ai lu {bookSoFar.length} {bookSoFar.length === 0 || bookSoFar.length === 1 ? 'livre' : 'livres'}</p>
  <p>j'ai lu {bdSoFar.length} {bdSoFar.length === 0 || bdSoFar.length === 1 ? 'bande dessinée' : 'bandes dessinées'}</p>
  <p>j'ai lu {mangaSoFar.length} {mangaSoFar.length === 1 ? 'manga' : 'mangas'}</p>

  <h2>Jeux vidéo</h2>

  <CultureItemStats
    barName="finishedGamesByYear"
    barLabels={generateYears(1987, currentYear, 1)}
    labelName="Répartition des jeux terminés (par année)"
    barData={generateDataByYear(games.filter(game => game.status === 'finished'), generateYears(1987, currentYear, 1))}
    donutName="gamesByStatus"
    donutData={generateDataByStatus(games, status)}
    donutLabels={status.map(a => a.converted)}
  />

  <h2>Films</h2>

  <CultureItemStats
    barName="finishedFilmsByYear"
    barLabels={generateYears(1910, currentYear, 10)}
    labelName="Répartition des films vus (par décennie)"
    barData={generateDataByYear(films.filter(film => film.status === 'finished'), generateYears(1910, currentYear, 10), 9)}
    donutName="filmsByStatus"
    donutData={generateDataByStatus(films, status)}
    donutLabels={status.map(a => a.converted)}
  />

  <h2>Livres</h2>

  <CultureItemStats
    barName="finishedBooksByYear"
    barLabels={generateYears(1600, currentYear, 10)}
    labelName="Répartition des livres lus (par décennie, depuis 1600)"
    barData={generateDataByYearFirstReleased(books.filter(book => book.status === 'finished'), generateYears(1600, currentYear, 10), 9)}
    donutName="BooksByStatus"
    donutData={generateDataByStatus(books, status)}
    donutLabels={status.map(a => a.converted)}
  />

</div>

<style lang="scss">
  h1 {
    z-index: 2;
    position: relative;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 120px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 120px;
    }
  }
</style>