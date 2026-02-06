<script>
  import { Chart } from "chart.js"
  import { onMount } from "svelte"

  let { itemType, collection, dateStart, currentYear, currentMonth, chartName } = $props()

  //particular collection: film, jv, livre...
  let filteredCollection = collection.filter(item => item.item_type === itemType)

  //only for this year
  let filteredCollectionThisYear = filteredCollection.filter(item => item.date_finished >= dateStart)

  //only this month
  let filteredCollectionThisMonth = filteredCollectionThisYear.filter(item => item.date_finished >= `${currentYear}-${currentMonth}-01` && item.date_finished <= `${currentYear}-${currentMonth}-31`)

  let itemPerMonth = []
  let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  for (const month of months) {
    let thisMonth = filteredCollectionThisYear.filter(item => item.date_finished >= `${currentYear}-${month}-01` && item.date_finished <= `${currentYear}-${month}-31`)
    itemPerMonth.push(thisMonth.length)
  }

  onMount(() => {
      const chart = document.getElementById(chartName)

      new Chart(chart, {
        type: "bar",
        data: {
          labels: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
          datasets: [{
            label: "Au cours de l'année",
            data: itemPerMonth,
          borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: { enabled: false }
          },
          elements: {
            bar: {
              backgroundColor: 'rgb(134, 130, 155)'
            }
          },
          scales: {
            x: { display: false},
            y: { display: false}
          }
        }
      })
    })
</script>

<div class="yearly">

  <div class="yearly-stat">
    <p>
      <span class="number">{filteredCollectionThisYear.length}</span>
      {#if itemType === "jeu vidéo"}
      {filteredCollectionThisYear.length === 0 || filteredCollectionThisYear.length === 1 ? `${itemType}` : `jeux vidéo`}
      {:else}
      {filteredCollectionThisYear.length === 0 || filteredCollectionThisYear.length === 1 ? `${itemType}` : `${itemType}s`}
      {/if}
      (+ {filteredCollectionThisMonth.length} ce mois-ci)
    </p>
  </div>

  <div class="yearly-canvas">
    <canvas id={chartName}></canvas>
  </div>
</div>

<style lang="scss">

  .yearly {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 25px;
    &-stat {
      line-height: 15px;
      align-self: flex-end;
      p {
        margin: 0;
      }
    }
    &-canvas {
      height: 50px;
      align-self: flex-end;
    }
  }

  .number {
    font-size: 2em;
    font-weight: bold;
    color: #88849C;
  }

  @media (min-width: 899px) {
    .yearly {
      flex-direction: row;
    }
  }
</style>