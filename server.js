import express from 'express'
import Stripe from 'stripe'
import { createServer as createViteServer } from 'vite'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()

// Webhook route — raw body nécessaire AVANT express.json()
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: 'Signature invalide' })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`Paiement réussi: ${event.data.object.id}`)
      break
    case 'payment_intent.payment_failed':
      console.log(`Paiement échoué: ${event.data.object.id}`)
      break
    default:
      console.log(`Événement: ${event.type}`)
  }

  res.json({ received: true })
})

// JSON parser pour les autres routes
app.use(express.json())

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body

    if (!amount || typeof amount !== 'number' || !Number.isInteger(amount) || amount < 50) {
      return res.status(400).json({ error: 'Montant invalide (minimum 50 centimes)' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: { enabled: true }
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Stripe error:', error.message)
    res.status(500).json({ error: 'Erreur lors de la création du paiement' })
  }
})

// Vite dev server en middleware
const vite = await createViteServer({ server: { middlewareMode: true } })
app.use(vite.middlewares)

const port = 3000
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`)
})
