<script>
  import footer_tournesol_middle from "$lib/assets/inside-pages/footer_tournesol_middle.png"
  import footer_tournesol_right from "$lib/assets/inside-pages/footer_tournesol_right.png"
  import footer_tournesol_left from "$lib/assets/inside-pages/footer_tournesol_left.png"
</script>

<footer>

  <div id="footer-left">
    <a href="/textes">Textes</a>
    <a href="/collection">Collection</a>
    <a href="/blog">Blog</a>
    <a href="/info">À propos</a>
    <a href="/compte">Connexion</a>
  </div>
  <div id="footer-tournesol">
    <img src={footer_tournesol_middle} alt="Dessin d'un tournesol dans le footer" class="no-border" id="footer-tournesol-middle">
    <img src={footer_tournesol_right} alt="Dessin d'un tournesol dans le footer" class="no-border" id="footer-tournesol-right">
    <img src={footer_tournesol_left} alt="Dessin d'un tournesol dans le footer" class="no-border" id="footer-tournesol-left">
  </div>
  <div id="footer-right">
    <a href="/contact">Contact</a>  
    <a href="/soutien">Soutenez-moi</a>
    <a href="/mentions">Mentions légales</a>
    <a href="/credits">Crédits</a>
    <a href="/site-pro">Site pro</a>
  </div>


</footer>

<style lang="scss">
  footer {
    background-color: #e7e4f4;
    position: relative;
    z-index: 10;
    width: 100%;
    height: 300px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: auto;
    border-top: 3px solid darken(#8260b2, $amount: 15);
    font-size: 1.1rem;
    //border: solid 3px orange;
    :is(a:link, a:visited) {
      color: #8260b2;
    }
    :is(a:active, a:focus, a:hover) {
      color: #c1abe1;
      text-decoration: underline;
    }
  }

  #footer-left, #footer-right, #footer-tournesol {
    width: 30%;
    height: 100%;
  }

  #footer-left, #footer-right {
    //border: 3px solid red;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
  }

  #footer-tournesol {
    //border: solid 3px purple;
    position: relative;
    &-left, &-middle, &-right {
      position: absolute;
      bottom: 0;
    }
    &-left {
      left: 5%;
    }
    &-middle {
      left: 25%;
      z-index: 5;
    }
    &-right {
      right: 5%;
    }
  }

  @media (max-width: 900px) {
    footer {
      height: 180px;
      font-size: 1rem;
    }

    #footer-tournesol-right, #footer-tournesol-left {
      display: none;
    }
    
    #footer-tournesol {
      &-middle {
        left: 0;
      }
    }
  }

  @media (min-width: 1600px) {
    #footer-tournesol-middle {
      left: 35%;
    }
  }
</style>