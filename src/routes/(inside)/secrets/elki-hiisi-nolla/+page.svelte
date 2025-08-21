<script>
  import { onMount } from "svelte"
  import noita from "$lib/assets/inside-pages/noita_black_hole.mp4"

  //adding subtitles to the video for accessibility
  onMount(() => {
    let video = document.querySelector("video")
    let track = video.addTextTrack("captions", "Sous-titres", "fr")
    track.mode = "showing"
    track.addCue(new VTTCue(27, 28.5, "Il va tomber dans le trou noir"))
    track.addCue(new VTTCue(30, 31.5, "Putain"))
    track.addCue(new VTTCue(39, 41, "*rire nerveux*"))
    track.addCue(new VTTCue(41.5, 43.5, "*soupir à la finlandaise*"))
    track.addCue(new VTTCue(48, 50, "Tsk...Ouais."))
    track.addCue(new VTTCue(55, 56, "Ouais ouais"))
  })
</script>

<div>
  <video controls >
    <source src={noita} type="video/mp4">
  </video>

  <p>Ce clip est à la fois le début et la fin du texte 21 de l'Inktober 2023 intitulé "Chains". Si vous êtes arrivé-e-s sur ce lien suite à la lecture du texte, félicitations ! Vous avez trouvé le bon message caché.</p>
  <p>Quelques explications pour éclaircir le contexte. Il s'agit d'un clip d'<a href="https://oriane.ink">Oriane</a> qui essaie de terminer une quête dans <i>Noita</i>. C'est une quête très difficile, qu'on fait en général vers la fin du jeu et qui implique beaucoup d'étapes nécessitant de s'aventurer dans des régions particulièrement dangereuses et de manipuler des objets tout aussi risqués. Une de ces étapes demande de ramener un objet particulier, la Graine de Soleil, tout en haut de la pyramide, pour la faire éclore en Pierre du Soleil. Là où les problèmes commencent, c'est qu'à ce stade du jeu le monde n'est plus tout à fait stable, soit géologiquement, parce qu'on a fait beaucoup trop d'expérimentations (ou qu'on a ramené certaines entités en bas), soit programmatiquement, parce que la mémoire du jeu n'arrive plus à garder les objets si ils sortent d'une certaine zone autour de nous. Hélas pour Oriane, cette Pierre du Soleil avait d'autres idées en tête que de simplement rester en haut de la pyramide, et si elle ne parvenait pas à la rattraper, il y avait de grosses chances qu'elle disparaisse du monde à cause de ce bug de mémoire (sans possibilité d'en retrouver car c'est un objet unique dans le jeu). La suite est une tragi-comédie, une leçon pour toutes les apprenties alchimistes de <i>Noita</i>.</p>
</div>

<style lang="scss">
  video {
    width: 100%;
    height: auto;
    ::cue {
      font-size: 1.5em;
    }
  }
</style>