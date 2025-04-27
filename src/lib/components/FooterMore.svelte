<script>
  import feather_icon from "$lib/assets/icons/feather_icon.png"
  import coffee from "$lib/assets/icons/coffee.svg"
  import parchemin from "$lib/assets/icons/parchemin_icon.png"
  import kofi from "$lib/assets/icons/kofi.webp"
  import paypal from "$lib/assets/icons/paypal_logo.png"
</script>

<div class="divider">
  <img src={feather_icon} alt="Ligne de séparation entre le texte et le bas de page" class="no-border">
  <img src={feather_icon} alt="Ligne de séparation entre le texte et le bas de page" class="no-border">
  <img src={feather_icon} alt="Ligne de séparation entre le texte et le bas de page" class="no-border">
  <img src={feather_icon} alt="Ligne de séparation entre le texte et le bas de page" class="no-border">
  <img src={feather_icon} alt="Ligne de séparation entre le texte et le bas de page" class="no-border">
</div>

<p>Merci d'avoir lu mon texte. Si vous l'avez apprécié et que vous aimeriez me soutenir, vous pouvez me donner un peu d'argent sur la plateforme de votre choix:</p>

<div class="donation">
  <img src={kofi} alt="logo de Kofia" class="no-border"><a href="https://ko-fi.com/maratz">Ko-fi</a>
</div>
<div class="donation">
  <img src={coffee} alt="logo de Buy Me a Coffee" class="no-border"><a href="https://buymeacoffee.com/maratz">Buy Me a Coffee</a>
</div>
<div class="donation">
  <img src={paypal} alt="logo de Paypal" class="no-border"><a href="https://www.paypal.com/donate/?hosted_button_id=TAFRMWTK8MULL">Paypal</a>
</div>


<style lang="scss">
  .divider {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    margin: 30px 0;
    img {
      height: 35px;
    }
    img:nth-child(even) {
      transform: rotate(120deg);
    }
  }

  div + .donation {
    margin-top: 15px;
  }

  .donation {
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
    width: fit-content;
    justify-content: center;
    align-items: center;
    &:last-child {
      margin-bottom: 50px;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
</style>