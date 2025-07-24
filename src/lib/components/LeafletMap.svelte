<script>
  import { onMount, onDestroy } from 'svelte'

  export let souvenirs

  let mapElement
  let map
  let markers

  onMount(async () => {
    const leaflet = await import('leaflet')

    map = leaflet.map(mapElement).setView([46.9, 2.8], 6)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© contributeurs et contributrices <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    markers = souvenirs
    markers.forEach( marker => {
      leaflet.marker([marker.latitude, marker.longitude])
        .addTo(map)
        .bindPopup(`<b>${marker.name}</b><br/>${marker.notes}<br/>`)
        .on('click', () => {
          displayData(marker)
        })
    })

    //TODO create a method that exposes the data so that upon clicking it gets displayed in a div next to the map component
    //it's bound to marker.onclick above, now we just need to design and style the div. maybe do it directly on the map as a modal?
    // but it would become too big if I add too much information. Add a scrolling bar in the modal?
    const displayData = ( element ) => {
      document.getElementById('marker_name').textContent = `${element.name}, ${element.notes}`
      console.log(element.name)
    }
  });

  onDestroy(async () => {
      if(map) {
          console.log('Unloading Leaflet map.')
          map.remove()
      }
  });
</script>

<div bind:this={mapElement} id="map"></div>

<div id="marker_name"></div>

<style>
    @import 'leaflet/dist/leaflet.css';
    #map {
      width: 100%;
      height: 100%;
      z-index: 1;
      & img {
        border: none;
        border-radius: 0;
      }
    }

    #marker_name {
      border: 1px solid red;
    }
</style>