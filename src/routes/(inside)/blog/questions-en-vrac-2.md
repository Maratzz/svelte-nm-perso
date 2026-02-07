---
title: "Questions en vrac #2"
slug: questions-en-vrac-2
headline: "Et des réponses qui en amènent d'autres."
image: blog/suashem_carpette.webp
date: 2026-02-07
categories:
- blog
- questions
draft: published
---

Comme tout être humain deleuzien, je suis une machine à produire des questions, et lorsqu'il y a beaucoup de questions, suffisamment de questions, je les rassemble ici avec les réponses que j'ai pu trouver. Jusqu'à ce qu'un nouveau jour amène son lot, et la machine de repartir pour un tour. Ces billets, ce sont les questions en vrac, et en voici une nouvelle fournée.

## Pourquoi il y a des zones de vacances scolaires ?

Et d'abord, pourquoi ce découpage s'applique uniquement aux vacances d'hiver et de printemps, et pas les autres ?

Ce n'est pas un hasard. Les vacances, comme à peu près tout le reste, c'est d'abord politique et économique. Les vacances d'été déjà étaient au 19ème siècle une occasion pour les enfants des classes (eh) privilégiés - les seuls à fréquenter une école qui n'était alors pas obligatoire - de retourner avec leurs parents dans les maisons secondaires et participer aux socialisations bourgeoises, pour alimenter la reproduction de classe (1)

Avec l'émergence du tourisme de masse des années 50-60, lui-même issu des Trentes Glorieuses et des avancées du Front Populaire, on commence à imaginer un zonage pour les vacances d'été à partir de 1965, afin d'éviter les mouvements de masse où tout le monde part en même temps, prolos comme bourgeois, mais ce zonage est rapidement supprimé pour cette période-là.

C'est les jeux olympiques d'hiver de Grenoble de 1972 qui le fait revenir dans l'organisation des vacances, les hivernales cette fois. On décide alors d'adopter un zonage pour les vacances d'hiver, puis celles de printemps, en grande partie pour faire durer le plus que possible la saison du ski et du tourisme de la montagne, qui ne serait pas viable sans cela.

Aujourd'hui ce découpage en zones est toujours en vigueur, et le secteur du tourisme est même partie prenante dans les réflexions annuelles sur les périodes. Depuis 2015, la même année où la COP21 alerte sur les dangers du dérèglement climatique, les vacances de printemps ont été avancées à la demande de l'industrie du tourisme. (2)

Ce découpage divise le territoire en trois zones, mais elles ont varié au fil des rentrées, tant en nombre qu'en regroupements. Parfois deux, parfois une, puis à nouveau trois, et les académies pouvaient être en zone A une année puis B l'année suivante. Tooujours depuis 2015, les trois zones sont devenues pérennes, enfin jusqu'à la prochaine réforme. Elles fonctionnent par roulement sur trois ans, pour que ce ne soit pas à chaque fois les mêmes qui partent tôt ou tard selon leur emplacement géographique. (3)

## Comment on projette un film au cinéma de nos jours ?

Depuis que je travaille dans un cinéma j'ai eu l'occasion d'approfondir mes connaissances autour des procédures et l'envers du décor, et un des aspects qui me fascine le plus, comme souvent, c'est la matérialité du processus, la fabrication, la technique.

On sait depuis les frères Lumière qu'un film, ce n'est pas un vraiment un film, c'est en réalité beaucoup d'images qui défilent très vite à l'écran pour donner l'illusion que des choses bougent et que c'est continu, mais c'est grosso modo un diaporama sans espace entre les images.

Mais aujourd'hui, dans le monde moderne, est-ce que c'est toujours le cas ?

Eh bien oui, c'est toujours le cas.

Dans les cinémas, les projecteurs sont toujours des machines qui projettent des images, et par là je veux dire des bonnes grosses images au format JPEG 2000, qui est fondamentalement une meilleure version du format JPEG qu'on croise partout sur Internet.

Pour reformuler: au cinéma paradoxalement, on ne diffuse toujours pas une vidéo (un MP4, MKV, MOV, WMV) mais des [centaines de milliers d'images au format JPEG](https://www.youtube.com/watch?v=QEzhxP-pdos).

En fait ce ne sont pas simplement des milliers d'images. C'est un amalgame de plusieurs fichiers qui forment une playlist qu'on appelle DCP, pour _Digital Cinema Package_.

Il faut donc imaginer qu'un film au cinéma, c'est un dossier avec dedans:
- un fichier IMAGE qui contient toutes les images du film mises bout à bout, au format JPEG 2000, réunies dans plusieurs volumes
- un fichier SON qui contient toutes les pistes audio, non seulement pour les différents doublage, mais aussi pour la spatialisaton, si le film est mixé pour du 5.1 ou du 7.1, ou du ATMOS, ce qui veut dire des pistes supplémentaires.
- un fichier SOUS-TITRES avec tous les sous-titres, un par langage inclus dans le paquet
- un fichier de métadonnées et de chiffrement pour identifier et protéger tout ça

et enfin un fichier en XML qui va dire au serveur quoi lire en fonction de la configuration choisie. C'est ce fichier là, le Composition Playlist, qui pilote l'ensemble et permet la diffusion du film selon les paramètres choisis. Chaque version du film est associée à une Composition Playlit qui mélange et coordonne tout ou une partie des différents fichiers.

La playlist #1 peut dire au serveur, en simplifiant (il faudrait rajouter la synchronisation de toutes les parties impliquées, les vérifications de l'intégrité et de l'autorisation de diffuser, le déchiffrement et la décompression des fichiers): "sur le projecteur, projette le fichier IMAGE, qui comprend les volumes 1 à 4, dans l'ordre 1-2-3-4; sur le serveur son, dans le fichier SON, prends les pistes 1 à 8 qui correspondent au mixage en 7.1 et en anglais, avec la piste 1 à gauche, la piste 2 à droite, la piste 3 en renfort arrière, etc; et aussi, rajoute le fichier français des sous-titres sur le projecteur".

Alors que la playlist #2 pourrait dire à un autre serveur d'un autre cinéma: "sur le projecteur, projette le fichier IMAGE; sur le serveur son, dans le fichier SON, prends les pistes 9 à 14 qui correspondent au mixage en 5.1 et en français; et c'est tout, pas de sous-titres".

Ainsi depuis le même dossier, plusieurs versions du film cohabitent et peuvent être mixées comme on veut, sans avoir à produire une copie pour chaque combinaison possible, ce qui reviendrait très vite cher et prendrait beaucoup de place, en plus d'avoir des redondances inutiles.

Il y a encore beaucoup de choses à dire sur ce fonctionnement, mais ce sera pour une prochaine fournée de questions en vrac.

_Sources:_

(1) [L'école d'aujourd'hui à la lumière de l'histoire, par Claude Lelièvre, 2021, aux éditions Odile Jacob](https://www.odilejacob.fr/catalogue/histoire-et-geopolitique/histoire-par-themes/ecole-d-aujourd-hui-a-la-lumiere-de-l-histoire_9782738154866.php)  
(2) [Reportage France 3](https://france3-regions.franceinfo.fr/nouvelle-aquitaine/2015/04/03/l-impact-sur-le-tourisme-du-nouveau-calendrier-des-vacances-scolaires-697581.html)  
(3) [Les archives du calendrier scolaire - education.gouv](https://www.education.gouv.fr/les-archives-du-calendrier-scolaire-12449)