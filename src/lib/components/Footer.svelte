<script>
  import footer_tournesol_middle from "$lib/assets/inside-pages/footer_tournesol_middle.png"
</script>

<footer>

  <div id="footer-links">
    <div id="footer-left">
      <a href="/textes">Textes</a>
      <a href="/collection">Collection</a>
      <a href="/blog">Blog</a>
      <a href="/info">À propos</a>
    </div>
    <div id="footer-right">
      <a href="/contact">Contact</a>  
      <a href="/soutien">Soutenez-moi</a>
      <a href="/mentions">Mentions légales</a>
      <a href="/credits">Crédits</a>
      <a href="/site-pro">Site pro</a>
    </div>
  </div>

  <img src={footer_tournesol_middle} alt="Décor dans le footer" class="no-border" id="footer-tournesol-middle">
</footer>

<style lang="scss">
  footer {
    position: relative;
  }

  #footer-links {
    background-color: #e7e4f4;
    border-top: solid 4px darken($color: #d3cfe4, $amount: 10);
    margin: 100px 0 0 0;
    padding: 30px 0 50px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  #footer {
    &-left, &-right {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
    }
    &-tournesol-middle {
      position: absolute;
      bottom: -58px;
      left: 22vw;
      transform: scale(0.7);
    }
  }
</style>