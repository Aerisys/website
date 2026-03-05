# Plan : Admin Dashboard + Firebase

## Contexte

Le backend Express sert les produits depuis un fichier statique (`server/data/products.js`). Les commandes n'existent que dans les metadata Stripe (pas de BDD). On veut :
- Un dashboard admin sur `/boutique/admin` (CRUD produits + consultation/suppression commandes)
- Firebase Firestore comme BDD (produits + commandes)
- Firebase Auth pour protéger l'accès admin

---

## Architecture cible

```
server/
├── lib/
│   ├── firebase.js          # NOUVEAU — Firebase Admin SDK (db + auth)
│   ├── stripe.js             # inchangé
│   └── helpers.js            # inchangé
├── middleware/
│   └── requireAdmin.js       # NOUVEAU — vérifie le token Firebase
├── routes/
│   ├── admin.js              # NOUVEAU — CRUD produits + orders (protégé)
│   ├── products.js           # MODIFIÉ — lit depuis Firestore
│   ├── payments.js           # inchangé
│   └── webhooks.js           # MODIFIÉ — écrit les commandes dans Firestore
├── scripts/
│   └── migrate-products.js   # NOUVEAU — migration one-shot vers Firestore
├── data/
│   └── products.js           # conservé comme backup/référence
└── index.js                  # MODIFIÉ — monte adminRoutes

src/
├── lib/
│   └── firebase.js           # NOUVEAU — Firebase client SDK (auth seulement)
├── composables/
│   └── useAuth.js            # NOUVEAU — signIn, signOut, getToken, user ref
├── pages/
│   └── AdminPage.vue         # NOUVEAU — login + dashboard (produits + commandes)
└── router/
    └── index.js              # MODIFIÉ — ajoute /boutique/admin AVANT /:slug
```

**7 fichiers créés, 4 fichiers modifiés**

---

## Étapes

### 1. Installer les dépendances

```bash
npm install firebase-admin firebase
```

### 2. Variables d'environnement

Ajouter dans `.env.example` :

```env
# Firebase Admin SDK (serveur)
FIREBASE_PROJECT_ID=aerisys-xxxxx
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@aerisys-xxxxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Client SDK (exposé au navigateur)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=aerisys-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=aerisys-xxxxx
```

### 3. `server/lib/firebase.js` — Firebase Admin singleton

Initialise firebase-admin avec les env vars (même pattern que `server/lib/stripe.js`). Exporte `db` (Firestore) et `auth`.

### 4. `server/middleware/requireAdmin.js` — Middleware auth

Vérifie le header `Authorization: Bearer <token>` via `auth.verifyIdToken()`. Renvoie 401 si absent/invalide. Utilisé par toutes les routes `/api/admin/*`.

### 5. `server/routes/products.js` — Lire depuis Firestore

Remplacer `import { products } from '../data/products.js'` par des lectures Firestore :
- `GET /api/products` → `db.collection('products').get()` (filtre optionnel `?category=`)
- `GET /api/products/:slug` → `db.collection('products').doc(slug).get()` (le slug = ID du document)

Les catégories restent hardcodées dans ce fichier (elles changent rarement).

### 6. `server/routes/webhooks.js` — Écrire les commandes dans Firestore

Dans le case `payment_intent.succeeded`, ajouter un `db.collection('orders').add()` avec :
- `orderNumber`, `customerName`, `customerEmail`
- `amount`, `currency`, `cartSummary`
- `stripePaymentIntentId`, `status: 'succeeded'`
- `createdAt` (ISO string)

### 7. `server/routes/admin.js` — Routes admin protégées

Toutes les routes utilisent `requireAdmin` middleware.

**Produits :**
- `GET /api/admin/products` — liste tous les produits
- `POST /api/admin/products` — crée un produit (validation : name, slug, price requis)
- `PUT /api/admin/products/:id` — modifie un produit
- `DELETE /api/admin/products/:id` — supprime un produit

**Commandes :**
- `GET /api/admin/orders` — liste les commandes (tri par date desc)
- `DELETE /api/admin/orders/:id` — supprime une commande

### 8. `server/index.js` — Monter les routes admin

Ajouter `import adminRoutes` et `app.use(adminRoutes)` après `productRoutes` dans la chaîne middleware.

### 9. `src/lib/firebase.js` — Firebase client SDK

Initialise firebase côté client avec les `VITE_*` env vars. N'exporte que `auth` (pas de Firestore côté client — tout passe par l'API Express).

### 10. `src/composables/useAuth.js` — Composable auth

State partagé au niveau module (même pattern que useProducts/useCart) :
- `user` (ref) — utilisateur connecté ou null
- `loading` (ref) — état d'initialisation
- `signIn(email, password)` — connexion
- `signOut()` — déconnexion
- `getToken()` — récupère le JWT pour les headers API

### 11. `src/pages/AdminPage.vue` — Page admin

Page unique avec gate d'authentification intégrée :

**Non connecté :** formulaire login (email + mot de passe)

**Connecté :** dashboard avec 2 onglets :
- **Produits** : tableau (nom, prix, catégorie, stock, actions edit/suppr) + formulaire ajout/édition inline
  - Champs : name, slug, shortDescription, description, price (en euros → converti en cents), category (select), images (URLs séparées par virgule), tags (idem), specs (paires label/value), inStock (checkbox)
- **Commandes** : tableau (n° commande, client, email, montant, date, action suppr)

Toutes les requêtes API passent le token Firebase dans le header `Authorization: Bearer <token>`.

Style : Tailwind, mêmes conventions que le reste du projet (cards `bg-white rounded-2xl`, accent `primary-600`).

### 12. `src/router/index.js` — Ajouter la route admin

```js
{ path: '/boutique/admin', name: 'admin', component: () => import('@/pages/AdminPage.vue') },
```

**Important :** cette route DOIT être déclarée AVANT `/boutique/:slug` sinon Vue Router matche "admin" comme un slug produit.

### 13. `server/scripts/migrate-products.js` — Migration one-shot

Script qui lit `server/data/products.js` et écrit les 10 produits dans Firestore. Le slug est utilisé comme ID de document (lookup rapide). À lancer une seule fois :

```bash
node --env-file=.env server/scripts/migrate-products.js
```

### 14. `.gitignore` — Sécurité

Ajouter `serviceAccountKey.json` au cas où.

---

## Setup Firebase (manuel, hors code)

1. Créer un projet Firebase (ou utiliser un existant)
2. Activer **Firestore Database** (mode production)
3. Activer **Authentication** avec provider **Email/Password**
4. Créer un utilisateur admin dans Firebase Console > Authentication > Users
5. Générer une clé de service account → extraire project_id, client_email, private_key pour le `.env`
6. Règles Firestore :
   - `products` : read public, write si authentifié
   - `orders` : read/write si authentifié

---

## Vérification

1. `npm install` → firebase + firebase-admin installés
2. `node --env-file=.env server/scripts/migrate-products.js` → "Migrated 10 products"
3. `npm run dev` → API + Vue démarrent
4. `/boutique` → produits chargés depuis Firestore (vérifier Network tab)
5. `/boutique/explorer-kit` → détail produit OK
6. `/boutique/admin` → formulaire de login affiché
7. Login avec le compte admin → dashboard affiché
8. CRUD produit → créer, modifier, supprimer un produit → visible sur `/boutique`
9. Paiement test (carte 4242) → webhook écrit dans Firestore → commande visible dans l'onglet Commandes
10. Supprimer une commande → disparaît de Firestore
