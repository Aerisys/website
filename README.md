# Aerisys - Landing Page

Site web officiel du projet Aerisys, un drone éducatif open source.

## 🚀 Stack Technique

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Inter, Poppins (Google Fonts)

## 📁 Structure du Projet

```
aerisys/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── drones/          # Images des drones
│       └── team/            # Photos de l'équipe
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Sections de la page
│   │   └── ui/              # Composants réutilisables
│   ├── composables/         # Logique réutilisable (hooks)
│   ├── data/                # Données statiques
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🧩 Composants

### Layout
| Composant | Description |
|-----------|-------------|
| `AppHeader.vue` | Navigation sticky responsive |
| `AppFooter.vue` | Footer avec newsletter et liens |

### Sections
| Composant | Description |
|-----------|-------------|
| `HeroSection.vue` | Hero avec gradient et CTAs |
| `ProjectSection.vue` | Présentation du projet |
| `ConceptSection.vue` | Section "Du Rêve au Vol" |
| `TechnologiesSection.vue` | Grille des technologies |
| `GallerySection.vue` | Galerie d'images |
| `TeamSection.vue` | Équipe (12 membres) |
| `FaqSection.vue` | FAQ avec accordéon |

### UI (Réutilisables)
| Composant | Description |
|-----------|-------------|
| `BaseButton.vue` | Bouton avec variantes |
| `SectionTitle.vue` | Titre de section |
| `FeatureCard.vue` | Carte fonctionnalité |
| `TeamCard.vue` | Carte membre d'équipe |
| `FaqAccordion.vue` | Item accordéon FAQ |

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints Tailwind :
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js` :
- `primary-*` : Bleu principal (#2563eb)
- `aerisys-*` : Couleurs personnalisées

### Images
Remplacez les images placeholders dans :
- `/public/images/drones/` - Images des drones
- `/public/images/team/` - Photos de l'équipe

### Données
Modifiez les données dans `/src/data/` :
- `team.js` - Membres de l'équipe
- `features.js` - Fonctionnalités/technologies
- `faq.js` - Questions fréquentes
- `gallery.js` - Images de la galerie

## 📝 License

MIT License - Aerisys © 2024
