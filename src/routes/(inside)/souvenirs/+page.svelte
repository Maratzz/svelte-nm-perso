<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
  import full_image from "$lib/assets/homepage/full_image.webp"

  import { Map, TileLayer, Marker, Popup } from 'sveaflet'

  export let data
  let { souvenirs } = data
</script>

<HeadSEO 
  title="Nico Moisson | Souvenirs"
  description="À la poursuite de Nico, sans Diego"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="{full_image}"
  twitter
  openGraph
/>

<div>

  <h1>Souvenirs</h1>

  <p>
    Dans un coffre en bois massif,<br/>
    relégué au fond d'un grenier<br/>
    des jouets, des peluches,<br/>
    des jeux, des pelotes,<br/>
    et une vieille carte au trésor au papier jauni<br/>
    chaque marque dessus, un souvenir,<br/>
    chaque annotation, un passage<br/>
    dans le tunnel du temps.
  </p>

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
      <Marker latLng={[souvenir.latitude, souvenir.longitude]} >
        <Popup>
          <div class="popup">
            <div class="popup-image">
              <img src={souvenir.image_recto} alt="une médaille">
            </div>
            <div class="popup-content">
              <h4>{souvenir.name}</h4>
              <p><i>{souvenir.type}</i></p>
              <p>{souvenir.notes}</p>
            </div>
          </div>
        </Popup>
      </Marker>
      {/each}
    </Map>
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
      width: 140px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 70px;
    }
  }

  #map {
    width: 100%;
    height: 50vh;
    z-index: 1;
  }

  :global(#map img) {
    border: none;
    border-radius: 0;
  }

  .popup {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;
    width: fit-content;
    h4 {
      font-size: 1.5em;
      margin: 0 0;
    }
    p {
      margin: 0;
    }
    &-image {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: 100%;
      border: 1px solid red;
      img {
        height: 100%;
        width: 100%;
      }
    }
    &-content {
      display: flex;
      flex-flow: column wrap;
    }
  }
</style>