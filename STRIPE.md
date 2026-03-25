# Intégration Stripe — Aerisys

## Architecture

```
Client (Vue 3)                    Serveur (Express)          Stripe
─────────────────                 ──────────────────────────           ──────
PaymentForm.vue
  │
  ├─ POST /api/create-payment-intent ──→ Valide le montant
  │                                      Génère n° commande (AER-...)
  │                                      Crée un PaymentIntent ──────→ Stripe API
  │                                  ←── { clientSecret }
  │
  ├─ Monte le Payment Element (formulaire carte)
  │
  ├─ confirmPayment() ────────────────────────────────────────────────→ Stripe
  │                                                                       │
  └─ Redirection /checkout/success?payment_intent=pi_xxx                  │
       │                                                                  │
       ├─ GET /api/verify-payment?payment_intent=pi_xxx                   │
       │    └─ Vérifie le statut du paiement via Stripe API               │
       │    └─ Retourne n° commande, montant, infos client                │
       │                                                                  │
       └─ Affiche le récapitulatif de commande                            │
                                                                          │
                                   POST /api/stripe-webhook ←──────── Webhook
                                     └─ Vérifie signature
                                     └─ Log structuré avec n° commande
                                     └─ Gère succès/échec/remboursement/litige
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
npm run dev
```

Démarre l'API Express sur `http://localhost:3001` et Vite sur `http://localhost:5173` (avec proxy `/api` vers l'API).

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
stripe listen --forward-to localhost:3001/api/stripe-webhook
```

Le CLI affiche un `whsec_...` — le copier dans `.env` comme `STRIPE_WEBHOOK_SECRET`.

### 3. Tester un paiement

- Aller sur `http://localhost:5173/checkout`
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

## Routes API

### POST `/api/create-payment-intent`

Crée un PaymentIntent Stripe et génère un numéro de commande unique.

**Body (JSON) :**

| Champ           | Type   | Requis | Description                                  |
|-----------------|--------|--------|----------------------------------------------|
| `amount`        | number | Oui    | Montant en centimes (min 50, max 99 999 999) |
| `currency`      | string | Non    | `eur` (défaut), `usd`, ou `gbp`              |
| `customerName`  | string | Non    | Nom complet du client                        |
| `customerEmail` | string | Non    | Email — active le reçu Stripe automatique    |
| `cartItems`     | string | Non    | Résumé du panier (stocké en metadata)        |

**Réponse :** `{ clientSecret: "pi_xxx_secret_xxx" }`

### GET `/api/verify-payment`

Vérifie le statut d'un paiement côté serveur. Utilisé par la page de succès.

**Query params :**

| Param            | Type   | Requis | Description               |
|------------------|--------|--------|---------------------------|
| `payment_intent` | string | Oui    | ID du PaymentIntent (pi_) |

**Réponse :**

```json
{
  "status": "succeeded",
  "orderNumber": "AER-20260305-A1B2C3",
  "amount": 14900,
  "currency": "eur",
  "customerName": "Jean Dupont",
  "customerEmail": "jean@example.com",
  "cartSummary": "Explorer Kit x1, ESC 4-en-1 x2"
}
```

### POST `/api/stripe-webhook`

Reçoit les événements Stripe. Événements gérés :

| Événement                     | Action                                          |
|-------------------------------|-------------------------------------------------|
| `payment_intent.succeeded`    | Log structuré avec n° commande et infos client   |
| `payment_intent.payment_failed` | Log de l'échec avec raison                    |
| `charge.refunded`             | Log du remboursement                             |
| `charge.dispute.created`      | Log du litige                                    |

## Page de succès sécurisée

La page `/checkout/success` vérifie le paiement côté serveur :

1. Stripe redirige avec `?payment_intent=pi_xxx&redirect_status=succeeded`
2. La page appelle `GET /api/verify-payment?payment_intent=pi_xxx`
3. Si le serveur confirme `status: "succeeded"`, affiche le récapitulatif (n° commande, montant, articles)
4. Sans `payment_intent` valide dans l'URL, la page affiche "Page non accessible"

## Numéro de commande

Format : `AER-YYYYMMDD-XXXXXX` (ex: `AER-20260305-A1B2C3`)

- Généré côté serveur lors de la création du PaymentIntent
- Stocké dans `metadata.order_number` du PaymentIntent
- Accessible via le webhook et l'endpoint verify-payment

## Production

### Webhook en production

1. Dashboard Stripe > Developers > Webhooks
2. **Add endpoint**
3. URL : `https://ton-domaine.com/api/stripe-webhook`
4. Événements à écouter :
    - `payment_intent.succeeded`
    - `payment_intent.payment_failed`
    - `charge.refunded`
    - `charge.dispute.created`
5. Copier le **Signing secret** (`whsec_...`) dans les variables d'environnement

### Passer en mode live

Remplacer les clés `pk_test_` / `sk_test_` par les clés live `pk_live_` / `sk_live_`
depuis le Dashboard Stripe (désactiver le mode test).

## Fichiers concernés

| Fichier                                      | Rôle                                                   |
|----------------------------------------------|--------------------------------------------------------|
| `server/index.js`                            | Entry point Express (port 3001)                        |
| `server/routes/payments.js`                  | Routes create-payment-intent + verify-payment          |
| `server/routes/webhooks.js`                  | Route stripe-webhook (raw body)                        |
| `server/routes/products.js`                  | Routes API produits                                    |
| `server/lib/stripe.js`                       | Instance Stripe singleton                              |
| `server/lib/helpers.js`                      | generateOrderNumber()                                  |
| `src/components/ui/PaymentForm.vue`          | Formulaire Stripe Payment Element                      |
| `src/pages/CheckoutPage.vue`                 | Page `/checkout`                                       |
| `src/pages/CheckoutSuccessPage.vue`          | Page `/checkout/success` (vérification serveur)        |
| `.env.example`                               | Template des variables d'environnement                 |
