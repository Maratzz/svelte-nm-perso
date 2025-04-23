<script>
  import feather_icon from "$lib/assets/icons/feather_icon.png"
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
  <button class="donation-button"><img src={kofi} alt="logo de Kofia" class="no-border"><a href="https://ko-fi.com/maratz">Donner sur Ko-fi</a></button>
  <button class="donation-button"><img src={paypal} alt="logo de Paypal" class="no-border"><a href="https://www.paypal.com/donate/?hosted_button_id=TAFRMWTK8MULL">Donner sur Paypal</a></button>
</div>


<style lang="scss">
  .divider {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin: 30px 0;
    img {
      height: 35px;
    }
  }
  img:nth-child(even) {
    transform: rotate(120deg);
  }

  .donation {
    display: flex;
    flex-direction: column;
    gap: 30px;
    &-button {
      background-color: #D5C6DA;
      display: flex;
      flex-flow: row nowrap;
      gap: 10px;
      margin-left: 0;
      a {
        color: black;
      }
      img {
        height: 25px;
      }
    }
  }

  @media (min-width: 600px) {
    .donation {
      flex-direction: row;
    }
  }
</style>