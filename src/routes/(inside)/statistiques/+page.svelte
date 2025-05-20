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
  let bdSoFar = collection.filter(item => item.item_type === "BD" && item.date_started >= DateStart)
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

  <p>Pour l'année {currentYear} en cours</p>
  <div class="currentYear">
    <p>🎞️ j'ai vu {filmSoFar.length} {filmSoFar.length === (0 || 1) ? 'film' : 'films'}</p>
    <p>🎮 j'ai joué à {gameSoFar.length} {gameSoFar.length === (0 || 1) ? 'jeu vidéo' : 'jeux vidéo'}</p>
    <p>📚 j'ai lu {bookSoFar.length} {bookSoFar.length === (0 || 1) ? 'livre' : 'livres'}</p>
    <p>📘 j'ai lu {bdSoFar.length} {bdSoFar.length === (0 || 1) ? 'BD' : 'BDs'}</p>
    <p>📕 j'ai lu {mangaSoFar.length} {mangaSoFar.length === (0 || 1) ? 'manga' : 'mangas'}</p>
  </div>


  <div class="collapsible">
    <input type="checkbox" name="collapsible-games" id="collapsible-games">
    <label for="collapsible-games">Jeux vidéo</label>
    <div class="collapsible-body">
      <p>Je me souviens avoir démarré {(games.filter(game => game.status !== ("backlog" || "wishlist"))).length} jeux et terminé {(games.filter(game => game.status === "finished")).length} d'entre eux</p>
      <CultureItemStats
        barName="finishedGamesByYear"
        barLabels={generateYears(1987, currentYear, 1)}
        labelName="Date de sortie des jeux terminés (par année)"
        barData={generateDataByYear(games.filter(game => game.status === 'finished'), generateYears(1987, currentYear, 1))}
        donutName="gamesByStatus"
        donutData={generateDataByStatus(games, status)}
        donutLabels={status.map(a => a.converted)}
      />
    </div>
  </div>

  <div class="collapsible">
    <input type="checkbox" name="collapsible-films" id="collapsible-films">
    <label for="collapsible-films">Films</label>
    <div class="collapsible-body">
      <p>Je me souviens avoir démarré {films.length} films et terminé {(films.filter(film => film.status === "finished")).length} d'entre eux</p>
      <CultureItemStats
        barName="finishedFilmsByYear"
        barLabels={generateYears(1910, currentYear, 10)}
        labelName="Date de sortie des films vus (par décennie)"
        barData={generateDataByYear(films.filter(film => film.status === 'finished'), generateYears(1910, currentYear, 10), 9)}
        donutName="filmsByStatus"
        donutData={generateDataByStatus(films, status)}
        donutLabels={status.map(a => a.converted)}
      />
    </div>
  </div>

  <div class="collapsible">
    <input type="checkbox" name="collapsible-books" id="collapsible-books">
    <label for="collapsible-books">Livres</label>
    <div class="collapsible-body">
      <p>Je me souviens avoir ouvert {books.length} livres et terminé {(books.filter(book => book.status === "finished")).length} d'entre eux</p>
      <CultureItemStats
        barName="finishedBooksByYear"
        barLabels={generateYears(1750, currentYear, 10)}
        labelName="Date de sortie des livres terminés (par décennie, depuis 1750)"
        barData={generateDataByYearFirstReleased(books.filter(book => book.status === 'finished'), generateYears(1750, currentYear, 10), 9)}
        donutName="BooksByStatus"
        donutData={generateDataByStatus(books, status)}
        donutLabels={status.map(a => a.converted)}
      />
    </div>
  </div>

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

  .currentYear {
    p {
      line-height: 1;
    }
  }
</style>