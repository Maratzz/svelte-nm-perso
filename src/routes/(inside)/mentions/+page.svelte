<script>
  import HeadSEO from "$lib/components/HeadSEO.svelte"
</script>

<HeadSEO 
  title="Nico Moisson | Mentions légales"
  description="Personne ne les lit, d'ailleurs j'en profite pour dire que DK est sous-côté dans Melee"
  author="Nico 'Maratz' Moisson"
  siteName="Site personnel de Nico Moisson"
  imageURL="$lib/assets/homepage/full_image.png"
  twitter
  openGraph
/>

<div>
  <h1>Mentions légales</h1>

  <h2>1 - Édition du site</h2>

  <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet https://nicolasmoisson.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi:</p>

  <p>Propriétaire du site & directeur de la publication : Nico Moisson - Contact : <a href="mailto:nicolas.moisson@protonmail.com">nicolas.moisson [@] protonmail [point] com</a></p>

  <p>Hébergeur : <a href="https://vercel.com/">Vercel</a></p>

  <p>Autres contributeurs : Etienne Läderach pour les illustrations</p>

  <h2>2 - Propriété intellectuelle et contrefaçons.</h2>

  <p>Nico Moisson est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.</p>

  <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Nico Moisson.</p>

  <p>Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>

  <h2>3 - Limitations de responsabilité.</h2>

  <p>Nico Moisson ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site https://nicolasmoisson.fr.</p>

  <p>Nico Moisson décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur https://nicolasmoisson.fr.</p>

  <p>Nico Moisson s’engage à sécuriser au mieux le site https://nicolasmoisson.fr, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.</p>

  <h2>4 - Liens hypertextes et cookies</h2>

  <p>Le site https://nicolasmoisson.fr contient des liens hypertextes vers d’autres sites et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers https://nicolasmoisson.fr.</p>

  <h2>5 - Droit applicable et attribution de juridiction.</h2>

  <p>Tout litige en relation avec l’utilisation du site https://nicolasmoisson.fr est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Nantes.</p>
</div>

<style lang="scss">
  h1 {
    position: relative;
    z-index: 2;
    &::after {
      z-index: -1;
      display: inline-block;
      content: "";
      background-color: #C3BDD9;
      width: 80px;
      height: 20px;
      position: absolute;
      bottom: 0;
      right: 80px;
    }
  }
</style>