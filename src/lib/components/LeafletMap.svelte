<script>
  import { Map, TileLayer, Marker, Popup, Icon } from "sveaflet"
  import { formatDate, formatArray } from "$lib/utils/index.js"
  import icone_medaille from "$lib/assets/icons/icone_medaille_60x60.png"
  import icone_penny from "$lib/assets/icons/icone_penny_60x60.png"
  import icone_food from "$lib/assets/icons/food.svg"
  import icone_bar from "$lib/assets/icons/beer.svg"
  import icone_boutique from "$lib/assets/icons/shopping.svg"
  import icone_culture from "$lib/assets/icons/culture.svg"
  import icone_star from "$lib/assets/icons/star.svg"

  let { souvenirs } = $props()
  let flipped = $state(false)
</script>

  <div id="map">

    <Map
      options={{
        center: [46.9, 2.8],
        zoom: 6
      }}>
      <TileLayer
        url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
        options={{
          attribution: `© contributeur·rice·s <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`
        }}
      />
      {#each souvenirs as souvenir}
      <Marker latLng={souvenir.latLng} >
        {#if souvenir.type === "médaille"}
          <Icon options={{
                  iconUrl: icone_medaille,
                  popupAnchor: [15, 5],
                  iconSize: [25, 25],
                  popupAnchor: [0, -5] }}
          />
        {:else if souvenir.type === "penny"}
          <Icon options={{
                  iconUrl: icone_penny,
                  iconSize: [40, 40],
                  popupAnchor: [0, -5] }}
          />
        {:else if souvenir.type === "restaurant"}
          <Icon options={{
                  iconUrl: icone_food,
                  iconSize: [30, 30],
                  popupAnchor: [0, -5] }}
          />
        {:else if souvenir.type === "bar"}
          <Icon options={{
                  iconUrl: icone_bar,
                  iconSize: [35, 35],
                  popupAnchor: [0, -5] }}
          />
        {:else if souvenir.type === "boutique"}
          <Icon options={{
                  iconUrl: icone_boutique,
                  iconSize: [25, 25],
                  popupAnchor: [0, -5] }}
          />
        {:else if (souvenir.type === "culture" || souvenir.type === "attraction" || souvenir.type === "musée")}
          <Icon options={{
                  iconUrl: icone_culture,
                  iconSize: [30, 30],
                  popupAnchor: [0, -5] }}
          />
        {:else if souvenir.type === "parcours de vie"}
          <Icon options={{
                  iconUrl: icone_star,
                  iconSize: [30, 30],
                  popupAnchor: [0, -5] }}
          />
        {/if}
        <Popup>
          <div class="popup" >
            {#if souvenir.image_recto !== null}
              <div
                class="popup-image"
                id="image-{souvenir.id}"
                class:flipped onclick="{() => flipped = !flipped}"
                onkeypress={() => flipped = !flipped}
                role="img"
                aria-labelledby="image-face-{souvenir.id}">

                <div class="popup-image-inner">

                  <div class="popup-image-front">
                    <img src={souvenir.image_recto} alt="Côté pile ou recto de la médaille ou du scan lié à ce souvenir" id="image-face-{souvenir.id}">
                  </div>

                  <div class="popup-image-back">
                    <img src={souvenir.image_verso} alt="Côté face ou verso de la médaille ou du scan lié à ce souvenir">
                  </div>

                </div>

              </div>
            {/if}

            <div class="popup-content">
              <h2>{souvenir.name}</h2>
              <p><i>{souvenir.type}, visité {#if souvenir.date !== null}
                le {formatDate(souvenir.date)}{:else}il y a quelques temps
              {/if}</i></p>
              {#if souvenir.people !== null}
                <p><i>avec {formatArray(souvenir.people)}</i></p>
              {/if}
              {#if souvenir.tagline !== (null || "")}
                <p>{souvenir.tagline}</p>
              {/if}
              <p class="long">{souvenir.notes}</p>
            </div>
          </div>
        </Popup>
      </Marker>
      {/each}
    </Map>

  </div>

<style lang="scss">
  #map {
    width: 100%;
    height: 50vh;
  }

  :global(#map img) {
    border: none;
    border-radius: 0;
  }

  :global(.leaflet-container) {
    z-index: 1;
  }

  .popup {
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    width: fit-content;
    h2 {
      font-size: 1.3em;
      margin: 0 0;
      padding-bottom: 5px;
    }
    p {
      margin: 0;
    }
    &-content {
      display: flex;
      flex-flow: column wrap;
      p:last-child {
        margin-top: 10px;
      }
    }
  }

  .popup-image {
    background-color: transparent;
    perspective: 1000px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    cursor: pointer;
  }

  .popup-image-inner {
    width: 200px;
    height: 200px;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .popup-image.flipped .popup-image-inner {
    transform: rotateY(180deg);
  }

  .popup-image-front,
  .popup-image-back {
    position: absolute;
    width: 200px;
    height: 200px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .popup-image-front img, .popup-image-back img {
    width: auto;
    height: 200px;
    object-fit: contain;
  }

  .popup-image-back {
    transform: rotateY(180deg);
  }

  .long {
    max-height: 100px;
    overflow-y: auto;
    white-space: pre-wrap;
  }

  :global(.leaflet-popup) {
    width: 250px;
  }

  p:has(+ p.long) {
    padding-top: 5px;
  }
</style>