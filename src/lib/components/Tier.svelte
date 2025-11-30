<script lang="ts">

  let { tierName, tierID } : { tierName: string, tierID: number} = $props()

  const flipDurationMs = 200

</script>

<div class="tier" id="tier-{tierID}">
  <div class="tier-label">{tierName}</div>
  <div class="tier-content"></div>
</div>

<style lang="scss">
  .tier {
    width: 100%;
    min-height: 120px;
    height: fit-content;
    border: 1px solid black;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 10px;
    &-label {
      flex-basis: 20%;
      background-color: var(--color);
      align-content: center;
      text-align: center;
      font-size: 1.2em;
    }
    &-content {
      flex-basis: 80%;
      background-color: #FFFFFF;
    }
  }
</style>
