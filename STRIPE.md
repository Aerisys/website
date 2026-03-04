# Intégration Stripe — Aerisys

## Architecture

```
Client (Vue 3)                    Serveur (server.js)                Stripe
─────────────────                 ──────────────────                 ──────
PaymentForm.vue
  │
  ├─ POST /api/create-payment-intent ──→ Crée un PaymentIntent ──→ Stripe API
  │                                  ←── { clientSecret }
  │
  ├─ Monte le Payment Element (formulaire carte)
  │
  ├─ confirmPayment() ────────────────────────────────────────────→ Stripe
  │                                                                   │
  └─ Redirection /checkout/success                                    │
                                                                      │
                                   POST /api/stripe-webhook ←──── Webhook
                                     └─ Vérifie signature
                                     └─ Traite l'événement
```

## Variables d'environnement

Copier `.env.example` vers `.env` et remplir :

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...    # Clé publique (exposée côté client)
STRIPE_SECRET_KEY=sk_test_...              # Clé secrète (serveur uniquement)
STRIPE_WEBHOOK_SECRET=whsec_...            # Secret webhook (serveur uniquement)
```

Les clés de test sont disponibles dans le Dashboard Stripe > Developers > API keys.

## Développement local

### 1. Lancer le serveur

```bash
npm run dev:stripe
```

Démarre Vite + Express sur `http://localhost:3000` avec les routes API.

### 2. Configurer le webhook local

Installer le Stripe CLI :

```bash
brew install stripe/stripe-cli/stripe
```

Se connecter :

```bash
stripe login
```

Lancer le forward :

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Le CLI affiche un `whsec_...` — le copier dans `.env` comme `STRIPE_WEBHOOK_SECRET`.

### 3. Tester un paiement

- Aller sur `http://localhost:3000/checkout`
- Utiliser la carte de test : `4242 4242 4242 4242`
- Date : n'importe quelle date future
- CVC : n'importe quel code à 3 chiffres
- Les événements apparaissent dans le terminal du Stripe CLI

### Autres cartes de test

| Carte                 | Résultat                           |
|-----------------------|------------------------------------|
| `4242 4242 4242 4242` | Paiement réussi                    |
| `4000 0000 0000 3220` | Authentification 3D Secure requise |
| `4000 0000 0000 9995` | Paiement refusé                    |

## Production

### Déploiement

Le front se build normalement :

```bash
npm run build
```

Le dossier `dist/` contient le site statique à servir via ton CDN.

Pour les routes API, il faut un serveur Node (ou équivalent) qui exécute `server.js`
derrière un reverse proxy pointant `/api/*` vers le serveur.

### Webhook en production

1. Dashboard Stripe > Developers > Webhooks
2. **Add endpoint**
3. URL : `https://ton-domaine.com/api/stripe-webhook`
4. Événements à écouter :
    - `payment_intent.succeeded`
    - `payment_intent.payment_failed`
5. Copier le **Signing secret** (`whsec_...`) dans les variables d'environnement du serveur

### Passer en mode live

Remplacer les clés `pk_test_` / `sk_test_` par les clés live `pk_live_` / `sk_live_`
depuis le Dashboard Stripe (désactiver le mode test).

## Fichiers concernés

| Fichier                                      | Rôle                                                   |
|----------------------------------------------|--------------------------------------------------------|
| `server.js`                                  | Serveur Express : routes API + Vite en middleware      |
| `netlify/functions/create-payment-intent.js` | Alternative Netlify Functions (si hébergé sur Netlify) |
| `netlify/functions/stripe-webhook.js`        | Alternative Netlify Functions (si hébergé sur Netlify) |
| `src/components/ui/PaymentForm.vue`          | Formulaire Stripe Payment Element                      |
| `src/pages/CheckoutPage.vue`                 | Page `/checkout`                                       |
| `src/pages/CheckoutSuccessPage.vue`          | Page `/checkout/success`                               |
| `.env.example`                               | Template des variables d'environnement                 |
