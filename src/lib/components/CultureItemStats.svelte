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
            'rgb(70, 99, 86)',
            'rgb(135, 99, 132)',
            'rgb(25, 140, 210)',
            'rgb(200, 99, 89)'
          ],
          hoverOffset: 4
        }]
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
  .bar {
    width: 100%;
  }

  .donut {
    width: 40%;
  }
</style>