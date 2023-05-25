---
title: Apprendre SvelteKit en créant un blog Markdown statique 
date: "2021-12-14"
categories: 
  - "blog"
  - "sveltekit"
---

# Apprendre SvelteKit en créant un blog Markdown statique (traduction)

En démarrant la refonte de mon site perso j'avais plusieurs objectifs en tête:

 - me familiariser avec Svelte et SvelteKit à travers un projet qui me tient à coeur
 - documenter ma progression, ainsi que les difficultés rencontrées, les solutions, et les améliorations au fil du temps, jusqu'à obtenir le site et les fonctionnalités que je voulais
 - contribuer en français à la documentation autour de ces nouveaux outils qui est très limitée dans cette langue.

En faisant des recherches préliminaires je suis tombé sur [l'excellent billet de Josh Collinsworth](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) sur son blog, qui m'a permis de démarrer et d'appréhender les différentes facettes de SvelteKit. 

Sa concision et sa pédagogie sont un modèle pour la transmission d'informations, aussi ai-je demandé à Josh si je pouvais adapter son billet et le traduire pour en faire profiter les personnes francophones désireuses de se lancer à leur tour dans l'apprentissage de ces nouveaux outils.

Merci encore à Josh pour son aide ! À noter que son site, https://joshcollinsworth.com/ , est lui aussi entièrement fait avec Svelte et SvelteKit, et qu'il contient de nombreux articles tout aussi passionnants et informatifs que celui que j'ai choisi de traduire, n'hésitez pas à y faire un tour.

---

## Ce que nous allons faire, et ce qu'il faut savoir avant de commencer

Cet article est un tutoriel pour créer un blog statique pré-rendu avec l'aide de SvelteKit, Markdown, Sass et une API (ce site est construit comme cela, au fait)
C'est aussi une introduction à SvelteKit en soi, avec une bonne vue d'ensemble des fondamentaux qui devraient être utilisables pour n'importe quel projet.
C'est en dernier lieu *fun*!*
**mon avis perso*

## Vous bénéficierez le plus de ce tuto si vous:

 - connaissez les bases du développement front-end et de JavaScript;
 - avez au préalable une connaissance basique de Svelte (vous pouvez certainement suivre l'article sans ça, mais je recommande de lire le [tutoriel de Svelte](https://svelte.dev/tutorial/basics) d'abord si vous êtes complètement novices)
 - connaissez les bases de Markdown et de Sass;
 - connaissez les bases de récupérer des données en JSON depuis une API
 - savez déjà installer des paquets avec npm

Pour finir, si vous ne souhaitez pas faire tout le tutoriel et préféreriez avoir directement la structure complète du blog clé en main, allez voir [le dossier de démarrage SvelteKit](https://github.com/josh-collinsworth/sveltekit-blog-starter) (c'est plus abouti que ce qu'on va fabriquer ici, mais les concepts sous-jacents sont les mêmes.)

C'est parti !

## Créer une nouvelle application SvelteKit

Pour générer un nouveau projet SvelteKit, exécutez cette commande dans votre terminal (évidemment, vous pouvez changer `my-app` pour n'importe quel autre nom que vous préférez)

    npm create svelte@latest my-app

Quand vous exécutez la commande `init` pour démarrer, SvelteKit va vous poser quelques questions sur votre projet et ce que vous voulez faire:
image pour la commande

Nous allons choisir l'option **"Skeleton project"** (*attention, pas Library skeleton project, car nous simplement faisons un site, pas une librairie*)

> **Note** 
> Si c'est la première fois que vous utilisez SvelteKit, n'hésitez
> pas à choisir "SvelteKit demo app", explorer un peu le projet pour se
> faire une idée de comment ça marche, et revenir après. C'est une bonne
> introduction, mais c'est fourni avec plusieurs fichiers et styles qui
> prendraient du temps à effacer pour commencer

L'outil de préparation va également demander vos préférences au sujet de TypeScript, ESlint et Prettier. Je n'utiliserai pas TypeScript pour rester simple dans ce tutoriel, mais vous pouvez l'utiliser si vous le souhaitez (Svelte marche plutôt bien avec.)
Après avoir fait vos choix et quelques secondes d'installation, vous devriez voir apparaître `Your project is ready!` dans votre terminal, ainsi que les prochaines étapes et des liens utiles:
image pour la commande terminée

À ce moment-là, ouvrez votre projet dans VS Code (ou dans votre éditeur de texte préféré). Puis installez les dépendances dans le terminal et lancez le serveur de développement:

    npm install
    npm run dev -- --open

Terminez ces commandes et votre nouveau site s'affichera dans la fenêtre de votre navigateur
image de welcome to sveltekit

Le squelette tel quel n'est pas très excitant, et il n'y a même pas de CSS. Mais c'est okay; ça nous laisse le champ libre pour personnaliser notre application comme on le souhaite, sans avoir à supprimer ou à modifier du code déjà présent.

C'est notre canvas blanc, et nous allons prochainement peindre dessus.

## Créer des routes dans SvelteKit

Comme beaucoup de frameworks (et PHP également, en fait), SvelteKit a une approche du *routing* et des pages formée sur les dossiers et les fichiers; la structure de `src/routes` va définir la structure de votre site.

N'importe quel dossier dans `src/routes` devient le nom d'une page. Un fichier `+page.svelte` à l'intérieur de ce dossier constitue le contenu HTML de la page.
Du coup, à l'intérieur de `src/route`:
- `+page.svelte` est la page d'accueil
- `a-propos/+page.svelte` serait la page `/a-propos`
- `blog/+page.svelte` serait la page `/blog`
- `blog/un-post/+page.svelte` deviendrait `/blog/un-post`

> Note La convention de `+page.svelte` peut prêter à confusion ou sembler
> inutilement complexe, surtout si vous étiez habitué·e·s à l'ancienne
> convention index.svelte. Mais comme nous le verrons prochainement, le
> préfixe + permet de faire la différence entre les pages et les
> composants. Il y a d'autres choses également que l'ont peut rajouter
> aux routes en plus des pages, comme des chemins dynamiques de serveur;
> nous verrons cela plus tard.

## Ajouter des pages

Histoire de démarrer avec quelques pages sur notre site, créons les dossiers `a-propos`, `contact` et `blog` à l'intérieur de `src/routes` (on peut toujours les supprimer ou les modifier plus tard.)
Dans chacun de ces dossiers nous ajouterons un fichier `+page.svelte`, pour générer le contenu de la page, ce que les personnes verront lorsqu'elles navigueront vers cette route du site.

Dans chacun de ces fichiers insérons un petit *header* et un peu de texte, juste pour avoir un peu de contenu.

dans `a-propos/+page.svelte`

    <h1>Salut, je suis Nico !</h1>
    <p>Ceci est ma page "à propos"</p>
    
dans `contact/+page.svelte`

    <h1>Restons en contact</h1>
    <p><a href="mailto:test@test.com">Envoyez-moi un mail!</a></p>

dans `blog/+page.svelte`

    <h1>Blog</h1>
    <p>My blog posts will go here eventually…</p>

Notre dossier `src/routes` devrait ressembler à cela maintenant:
image folder src/routes

Vous pouvez à présent visiter `/contact`, `/a-propos` ou `/blog` et voir les pages que vous venez de créer. Il n'y a pas grand-chose encore bien sûr, mais c'est chouette de voir au moins que le *routing* est pris en charge automatiquement juste en créant des dossiers à l'intérieur de `routes` et en y ajoutant des fichiers `+page.svelte`

À l'intérieur