<script>

  import { onMount, onDestroy } from 'svelte'
  import { formatDate } from "$lib/utils/index.js"
  import { Map, TileLayer, Marker, Popup } from 'sveaflet'

</script>

<div id="map">
  <Map
      options={{
        center: [51.505, -0.09],
        zoom: 13
      }}
    >
      <TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}  class="no-border"/>
      <Marker latLng={[51.505, -0.09]} />
    </Map>
</div>

<style lang="scss">
  #map {
    width: 100%;
    height: 50vh;
    z-index: 1;
  }

  :global(#map img) {
    border: none;
    border-radius: 0;
  }
</style>