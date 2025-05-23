<script>
  import { onMount, onDestroy } from 'svelte'

  let mapElement
  let map

  onMount(async () => {
      const leaflet = await import('leaflet')

      map = leaflet.map(mapElement).setView([46.9, 2.8], 6)

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      //TODO ideally duplicate this with each markers as marker from page.js data and we put it in a map component initialized.
      leaflet.marker([46.9, 2.8]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup()
  });

  onDestroy(async () => {
      if(map) {
          console.log('Unloading Leaflet map.')
          map.remove()
      }
  });
</script>

<div bind:this={mapElement}></div>

<style>
    @import 'leaflet/dist/leaflet.css';
    div {
      width: 100%;
      height: 100%;
      z-index: 1;
      & img {
        border: none;
        border-radius: 0;
      }
    }
</style>