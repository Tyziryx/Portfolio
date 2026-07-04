---
name: portfolio-design
description: Système de design et règles éditoriales du portfolio d'Alexi (tyzi.fr). À utiliser pour TOUTE modification visuelle ou de contenu du site, pour rester cohérent et éviter le rendu "généré par IA".
---

# Design system du portfolio tyzi.fr

Le portfolio d'Alexi Miaille, étudiant réseaux & systèmes. Identité : terminal / infrastructure, sombre, brut, précis. Chaque choix visuel vient de son monde réel (bash, nginx, OPNsense, GNS3), pas d'un template.

## Tokens (ne pas improviser)

| Rôle | Valeur |
|------|--------|
| Fond | `#09090B` + grille de points `radial-gradient(circle, #1c1c20 1px, transparent 1px)` 32px |
| Texte | `#F4F4F5`, secondaire `#A1A1AA`, sourdine `#71717A` |
| Accent unique | `#A855F7` (violet) + `rgba(168,85,247,0.12)` en fond dim |
| Sémantique | ok `#4ade80`, warn `#fbbf24`, crit `#f87171` (réservé aux mocks supervision/terminal) |
| Bordures | `#27272A` |
| Display (titres) | Bricolage Grotesque 700/800, uppercase, letter-spacing -0.03/-0.04em |
| Corps | Inter 400/600 |
| Utilitaire/labels | JetBrains Mono, uppercase, letter-spacing 0.15-0.3em |
| Coins | clip-path biseauté 8px (`.bevel`), JAMAIS de border-radius |

## Signature

Le **terminal interactif** du hero est LA pièce signature. Tout nouvel élément visuel doit parler ce langage : diagramme ASCII, sortie de commande, panneau de supervision. Pas d'illustrations, pas de 3D, pas de stock.

## Contraintes négatives (anti-IA)

- Pas de dégradé violet→bleu, pas de glassmorphism, pas de blobs 3D
- Pas de `border-radius` (ADN = biseau)
- Pas de tirets cadratins (—) dans les textes
- Pas d'emoji en marqueurs de section
- Pas d'Inter en titres (réservé au corps de texte)
- Un seul accent de couleur ; le vert/jaune/rouge = sémantique terminal uniquement
- Pas de "Lorem ipsum", toujours le vrai contenu d'Alexi

## Voix et contenu

- **Vouvoiement** pour le visiteur ("Essayez", "tapez help")
- Première personne naturelle pour Alexi ("J'ai monté…", "Mon plus gros projet…")
- Ton humain, factuel, pas de superlatifs marketing
- Hiérarchie projets : phares = **Réseau PME GNS3** et **Mbox**. Grafana = réalisation stage (jamais en premier). Jamais mentionner le tuteur de stage.
- Stage raconté en 2 phases chronologiques : projets, puis quotidien avec l'équipe (prolongation = marque de confiance)

## Contraintes techniques

- Hébergé sur VPS Ionos XS : bundle léger obligatoire. Pas de lib UI, pas de Tailwind CDN, CSS artisanal compilé (~17 Ko). Images ≤ 110 Ko (JPEG q78, max 1280px).
- Mobile d'abord vérifié : sections 44px de padding, ghost numbers masqués, terminal réduit
- `prefers-reduced-motion` respecté, focus visible, aria-labels sur les icônes

## Références externes (à consulter avant tout gros changement visuel)

- Mobbin (https://mobbin.com) : vrais écrans d'apps modernes
- Land-book (https://land-book.com) : galerie de vrais sites propres
- Siteinspire (https://www.siteinspire.com) : minimal, portfolios
- DevInspo et Muzli pour les tendances portfolio dev
- Heuristiques Nielsen Norman (https://www.nngroup.com/articles/ten-usability-heuristics/) : statut visible, cohérence, minimalisme, messages d'erreur clairs (notre 404 terminal), reconnaissance plutôt que mémorisation

## Process

Avant modification visuelle : relire ces tokens, vérifier sur mobile (≤ 700px), builder (`npm run build`), puis déployer selon la mémoire `reference-vps-deploy`.
