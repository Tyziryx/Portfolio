## Description du projet

Ce portfolio moderne présente mes compétences, projets et informations de contact dans une interface élégante et interactive avec support multilingue (français et anglais).

## Fonctionnalités

- **Design moderne** avec animations et effets visuels
- **Interface responsive** s'adaptant à tous les appareils
- **Support multilingue** (français et anglais)
- **Sections organisées** : À propos, Projets, Compétences, Contact
- **Barre de navigation interactive** avec détection de section active
- **Animations au défilement** avec la bibliothèque AOS
- **Thème sombre** avec dégradés et effets visuels modernes
- **Indicateurs de niveau de compétence** visuels

## Technologies utilisées

- React.js
- JavaScript (ES6+)
- HTML5 & CSS3
- AOS (Animate On Scroll)
- Font Awesome
- LocalStorage (pour sauvegarder la langue)
- React Context API (pour la gestion de l'état global)

## Prérequis

Pour exécuter ce projet localement, vous aurez besoin de :

- Node.js (version 14 ou supérieure)
- npm (généralement installé avec Node.js)

## Installation

Suivez ces étapes pour installer et configurer le projet sur votre machine locale :

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/Tyziryx/mon-portfolio.git
   cd mon-portfolio
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

   Si vous rencontrez des problèmes avec React 19, vous pouvez installer une version stable :
   ```bash
   npm uninstall react react-dom
   npm install react@18.2.0 react-dom@18.2.0
   ```

3. **Installez Font Awesome si nécessaire**
   ```bash
   npm install @fortawesome/fontawesome-free
   ```

## Exécution locale

Pour lancer l'application en mode développement :

```bash
npm start
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Le serveur de développement se rechargera automatiquement si vous modifiez les fichiers source.

## Construction pour la production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Cela génère une version de production dans le dossier `build`, optimisée pour les meilleures performances. Les fichiers sont minifiés et les noms incluent des hachages.

## Structure du projet

```
mon-portfolio/
├── public/                # Fichiers publics et index.html
├── src/                   # Code source du projet
│   ├── assets/            # Images et ressources
│   │   └── images/        # Images du projet
│   ├── components/        # Composants React
│   │   ├── About/         # Section À propos
│   │   ├── Contact/       # Section Contact
│   │   ├── Footer/        # Pied de page
│   │   ├── Header/        # En-tête avec navigation
│   │   ├── Hero/          # Section d'accueil
│   │   ├── Projects/      # Section Projets
│   │   └── Skills/        # Section Compétences
│   ├── context/           # Contextes React (gestion d'état)
│   │   └── Context.jsx    # Contexte de langue
│   ├── hooks/             # Hooks personnalisés
│   │   └── Hooks.jsx      # Hook de traduction
│   ├── translations/      # Fichiers de traduction
│   │   ├── fr.jsx         # Traductions françaises
│   │   └── eng.jsx        # Traductions anglaises
│   ├── App.js             # Composant principal
│   ├── index.js           # Point d'entrée
│   └── *.css              # Fichiers de styles
└── package.json          # Configuration du projet et dépendances
```

## Personnalisation

Pour personnaliser le portfolio avec vos propres informations :

1. Modifiez les fichiers de traduction dans translations pour mettre à jour les textes
2. Remplacez les images dans images par vos propres images
3. Mettez à jour les liens des projets et des réseaux sociaux dans les composants correspondants

## Problèmes courants et solutions

### Problème de dépendances React

Si vous rencontrez des erreurs liées à React 19, installez une version stable :

```bash
npm uninstall react react-dom
npm install react@18.2.0 react-dom@18.2.0
```

### Problème de rendu des icônes Font Awesome

Si les icônes ne s'affichent pas, assurez-vous que Font Awesome est correctement importé :

```jsx
// dans index.js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

## Déploiement

Ce site peut être facilement déployé sur diverses plateformes comme Netlify, Vercel, ou GitHub Pages.

### Déploiement sur GitHub Pages

```bash
npm install --save gh-pages
```

Ajoutez ces lignes à votre package.json :

```json
"homepage": "https://votre-nom-utilisateur.github.io/mon-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Puis exécutez :

```bash
npm run deploy
```

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer selon les termes de cette licence.

## Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :

- Email: alexim13550@gmail.com
- GitHub: [Tyziryx](https://github.com/Tyziryx)
- LinkedIn: [Alexi Miaille](https://linkedin.com/in/alexi-miaille-baba88333)

---

Créé avec ❤️ par Alexi Miaille