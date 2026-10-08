# Changelog

Versions du portfolio [tyzi.fr](https://tyzi.fr). Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/) :

- **majeure** (5.0.0) : refonte du design ou de la structure du site
- **mineure** (4.3.0) : nouvelle section, nouvelle animation, nouveau projet
- **correctif** (4.2.1) : texte, CV, bug, finition

Le numéro vit dans `package.json` et s'affiche tout seul dans le pied de page (`$ uptime · v4.2.0`).

## Publier une version

1. Ajouter la section de la version ci-dessous (date, ce qui change).
2. `npm version minor` (ou `patch` / `major`) : met à jour `package.json`, commite et crée le tag `v4.3.0`.
3. `git push --follow-tags` : le push sur `master` déclenche le déploiement sur le VPS.

## [4.2.0] - 2026-10-08

### Ajouté
- Réseau PME : topologie isométrique animée, fidèle au schéma du rapport (Cloud, OPNsense, switch L3, plaques VLANs et DMZ). Trafic continu d'après les vraies règles : DNAT 3080 → 80, NAT outbound, ACL Cisco, anti-pivot DMZ. Requêtes en orange, réponses en vert, refus en rouge, LED des ports qui clignotent.
- Terminal : `whoami` tapé au chargement, curseur bloc, historique (↑), complétion (Tab), commandes `uptime`, `ping tyzi.fr`, `history`, `sudo`, `cat contact.txt`.
- Parcours : barre de progression liée au défilement, points qui s'allument, connecteurs vers les blocs.
- Mur Grafana : données vivantes dans la modal, alerte KPAX FIRING puis RESOLVED.
- Apparitions décalées des cartes, libellés `01 // …` qui se décodent, titre du hero en deux temps.
- Versioning : `CHANGELOG.md`, tags git, version affichée depuis `package.json`.

### Modifié
- Mur Grafana : couleurs sémantiques (Veeam en jaune, heatmap grise avec pic jaune), placé en fin de grille.
- Modal projet accessible (dialog, Échap, focus piégé puis rendu), ouverture animée.
- Menu mobile animé, numéroté, section active. Bouton de langue FR / EN.
- Contrastes des libellés gris, vignettes de projets assombries au repos, boutons à hauteur égale.
- Textes : temps verbaux, prolongation du stage, catégories en français, terminal anglais corrigé, « Cybersécurité » retiré du contact.

### Corrigé
- Débordement horizontal sur mobile (360 et 390 px) qui coupait le menu et la modal.
- Respect de `prefers-reduced-motion` (défilement, survols, animations).

## [4.1.0] - 2026-09-07

### Ajouté
- Alternance COMAITE dans le hero, le parcours et le terminal.
- Mur Grafana 6 écrans (mock CSS/SVG), topologie SVG animée.

## [4.0.0] - 2026-07-03

### Modifié
- Refonte complète : design « Réseaux & Systèmes », terminal interactif, contenu du stage SBI.
- Suivi en 4.0.x : mobile allégé, fonte Bricolage Grotesque, déploiement automatique vers le VPS, compteur de clics GitHub / LinkedIn, CV à jour.

## [2.0.3] - 2025-10-22
## [2.0.2] - 2025-05-13
## [2.0.1] - 2025-05-01
Correctifs de la v2 (cartes, mobile, liens).

## [2.0.0] - 2025-04-30
Deuxième version du portfolio.
