# Aerisys

Site web officiel du projet Aerisys, un drone educatif open source. Inclut une landing page, une boutique en ligne avec paiement Stripe, et un dashboard d'administration.

## Stack Technique

- **Frontend**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Fonts**: Hanson Bold (display), Neue Haas Grotesk (body)
- **Backend**: Express.js, MongoDB (Mongoose)
- **Paiement**: Stripe (Checkout Sessions + Webhooks)
- **Auth admin**: JWT (jsonwebtoken + bcrypt)

## Structure du Projet

```
aerisys/
├── public/
│   ├── logo/                # Logos SVG/PNG
│   └── images/
│       ├── drones/          # Images des drones
│       └── team/            # Photos de l'equipe
├── server/
│   ├── index.js             # Point d'entree Express
│   ├── lib/mongoose.js      # Connexion MongoDB
│   ├── middleware/auth.js    # Middleware JWT
│   ├── models/              # Schemas Mongoose (Product, Order, Admin)
│   ├── routes/
│   │   ├── admin/           # Routes CRUD admin (products, orders, categories, auth)
│   │   ├── products.js      # API publique produits
│   │   └── webhooks.js      # Webhook Stripe
│   ├── scripts/seed.js      # Seed produits + admin en base
│   └── data/products.js     # Donnees initiales
├── src/
│   ├── components/
│   │   ├── admin/           # Composants admin (AdminHeader)
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Sections de la landing page
│   │   └── ui/              # Composants reutilisables (BaseButton, ProductCard...)
│   ├── composables/         # useCart, useAuth
│   ├── pages/
│   │   ├── admin/           # Login, Dashboard, ProductForm, Orders
│   │   ├── BoutiquePage.vue
│   │   ├── ProductDetailPage.vue
│   │   ├── CheckoutPage.vue
│   │   └── CheckoutSuccessPage.vue
│   ├── router/index.js
│   ├── data/                # Donnees statiques (team, faq, etc.)
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Composants

### Layout

| Composant         | Description                      |
| ----------------- | -------------------------------- |
| `AppHeader.vue`   | Navigation sticky responsive     |
| `AppFooter.vue`   | Footer avec newsletter et liens  |

### Sections (Landing Page)

| Composant                 | Description                  |
| ------------------------- | ---------------------------- |
| `HeroSection.vue`         | Hero avec gradient et CTAs   |
| `ProjectSection.vue`      | Presentation du projet       |
| `ConceptSection.vue`      | Section "Du Reve au Vol"     |
| `TechnologiesSection.vue` | Grille des technologies      |
| `GallerySection.vue`      | Galerie d'images             |
| `TeamSection.vue`         | Equipe (12 membres)          |
| `FaqSection.vue`          | FAQ avec accordeon            |

### UI (Reutilisables)

| Composant          | Description                          |
| ------------------ | ------------------------------------ |
| `BaseButton.vue`   | Bouton avec variantes (primary, outline, ghost) |
| `SectionTitle.vue` | Titre de section                     |
| `ProductCard.vue`  | Carte produit boutique               |
| `FeatureCard.vue`  | Carte fonctionnalite                 |
| `TeamCard.vue`     | Carte membre d'equipe                |
| `FaqAccordion.vue` | Item accordeon FAQ                   |

### Admin

| Composant               | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `AdminHeader.vue`        | Header partage (logo, nav, lien boutique, logout)  |
| `AdminLogin.vue`         | Page de connexion admin                            |
| `AdminDashboard.vue`     | Grille de produits avec recherche et CRUD           |
| `AdminProductForm.vue`   | Formulaire creation/edition produit                |
| `AdminOrders.vue`        | Liste des commandes avec recherche                 |

## Installation

```bash
# Installer les dependances
npm install

# Lancer le serveur de developpement (frontend + backend)
npm run dev

# Build pour la production
npm run build
```

### Variables d'environnement

Copier `.env.example` en `.env` et renseigner :

- `MONGODB_URI` — URI de connexion MongoDB
- `JWT_SECRET` — Secret pour les tokens JWT admin
- `STRIPE_SECRET_KEY` — Cle secrete Stripe
- `STRIPE_WEBHOOK_SECRET` — Secret du webhook Stripe
- `VITE_STRIPE_PUBLISHABLE_KEY` — Cle publique Stripe

### Seed de la base de donnees

```bash
node server/scripts/seed.js
```

Cree les produits initiaux et un compte admin par defaut.

## Boutique

- `/boutique` — Catalogue produits avec filtres par categorie
- `/boutique/:slug` — Page detail produit avec specs, galerie, ajout au panier
- `/boutique/checkout` — Page de checkout (integration Stripe Checkout Sessions)
- `/boutique/checkout/success` — Page de confirmation apres paiement

## Admin (`/boutique/admin`)

Dashboard d'administration protege par JWT :

- **Login** — Connexion par email/mot de passe
- **Dashboard produits** — Grille de cards avec recherche, creation, edition, suppression
- **Formulaire produit** — Creation/edition avec builder de specs (label/valeur), categories, images, tags
- **Commandes** — Table avec recherche par numero/client/email, suppression

## Responsive Design

Le site est entierement responsive avec les breakpoints Tailwind (sm, md, lg, xl).

## Personnalisation

### Couleurs
Definies dans `tailwind.config.js` :
- `primary-*` — Bleu principal
- `aerisys-*` — Couleurs custom (gray, dark)

### Donnees
Modifiez les donnees dans `/src/data/` :
- `team.js` — Membres de l'equipe
- `features.js` — Fonctionnalites/technologies
- `faq.js` — Questions frequentes
- `gallery.js` — Images de la galerie
