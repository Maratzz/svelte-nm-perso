<script>
  import Chart from 'chart.js/auto'
  import { onMount } from 'svelte'
  export let barName, donutName
  export let barData, donutData
  export let barLabels, labelName, donutLabels

  onMount(() => {
    const bar = document.getElementById(barName)
    const donut = document.getElementById(donutName)

    new Chart(bar, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [{
          label: labelName,
          data: barData,
          borderWidth: 1
        }]
      },
      options: {
        elements: {
          bar: {
            backgroundColor: 'rgb(134, 130, 155)'
          }
        }
      }
    })

    new Chart(donut, {
      type: 'doughnut',
      data: {
        labels: donutLabels,
        datasets: [{
          data: donutData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(53, 69, 143)',
            'rgb(167, 125, 201)',
            'rgb(134, 130, 155)',
            'rgb(224, 13, 13)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            position:'right'
          }
        }
      }
    })
  })
</script>

<div class="bar">
  <canvas id={barName}></canvas>
</div>

<div class="donut">
  <canvas id={donutName}></canvas>
</div>

<style>
  .bar, .donut {
    width: 100%;
  }

  @media (min-width: 650px) {
    .donut {
      width: 60%;
    }
  }
</style>