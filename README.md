# Portfolio Alexi Miaille v3.0

Portfolio minimaliste d'Alexi Miaille - Étudiant L3 Informatique CERI Avignon.

## À propos

Portfolio personnel présentant mes projets, compétences et parcours en informatique.
Design minimaliste "tech brutalist" avec focus sur la lisibilité et la performance.

**Objectif** : Alternance Master SYRIUS (Systèmes, Réseaux, Cybersécurité) - Rentrée 2025

## Caractéristiques

- ✅ Design minimaliste pro (noir/violet/blanc)
- ✅ Multilingue FR/EN avec switch temps réel
- ✅ 5 projets académiques avec modals interactifs
- ✅ Section "En ce moment" pour montrer l'activité
- ✅ Build ultra-rapide (< 1s) avec Vite
- ✅ Responsive mobile/desktop
- ✅ Performance optimisée

## Stack Technique

- **React 19** avec TypeScript
- **Vite** comme bundler (build en ~950ms)
- **Tailwind CSS** (via CDN)
- **Lucide React** pour les icônes
- **Fonts** : Inter + JetBrains Mono

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000` (ou 3001 si 3000 est occupé)

## Build Production

```bash
npm run build
npm run preview
```

Le dossier `dist/` contient les fichiers prêts pour le déploiement.

## Structure

```
portfolio-v3/
├── public/
│   └── Logo_Alexi.svg      # Logo (favicon)
├── src/
│   ├── assets/images/      # Images projets
│   ├── App.tsx             # Composant principal
│   ├── index.tsx           # Point d'entrée
│   ├── translations.ts     # Traductions FR/EN
│   └── vite-env.d.ts       # Types TypeScript
├── index.html              # Template HTML
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Sections du Portfolio

1. **Hero** : Présentation rapide + liens sociaux
2. **À Propos** : Mon parcours, motivations, objectifs
3. **En ce moment** : Activités en cours (L3, projets, candidatures)
4. **Compétences** : Stack technique organisée par catégories
5. **Projets** : 5 projets académiques avec détails
6. **Contact** : Email + liens sociaux

## Projets Présentés

1. **Mbox** - Interface de gestion box internet (DHCP, DNS, monitoring)
2. **CeriCar** - Plateforme de covoiturage (Yii2, PostgreSQL)
3. **AdminMonitoring** - Système de monitoring système (Flask)
4. **GéoDex** - Site web de collection (PHP, PostgreSQL)
5. **Ma Supérette** - Application de gestion (Java, Swing)

## Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Glisser-déposer le dossier dist/ sur netlify.com/drop
```

### GitHub Pages
```bash
# Ajouter dans package.json:
# "homepage": "https://tyziryx.github.io/portfolio-v3"

npm install --save-dev gh-pages
npm run build

# Ajouter dans package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

npm run deploy
```

## Personnalisation

### Modifier les traductions
Éditer `src/translations.ts` pour changer les textes FR/EN.

### Modifier les couleurs
Dans `index.html`, variables CSS :
```css
:root {
  --bg: #09090B;
  --fg: #F4F4F5;
  --accent: #A855F7;
  --border: #27272A;
}
```

### Ajouter un projet
Dans `src/translations.ts`, ajouter `project6` puis mettre à jour `src/App.tsx`.

## Contact

- **Email** : alexim13550@gmail.com
- **LinkedIn** : [linkedin.com/in/alexi-miaille-baba88333](https://www.linkedin.com/in/alexi-miaille-baba88333/)
- **GitHub** : [github.com/Tyziryx](https://github.com/Tyziryx)

## Licence

MIT - Libre d'utilisation pour inspiration

---

**Version** : 3.0.0
**Auteur** : Alexi Miaille
**Dernière mise à jour** : Janvier 2025
