import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

// Idempotence simple en mémoire (reset au cold start — utiliser une BDD en production)
const processedEvents = new Set()

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(JSON.stringify({ error: 'Signature invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Vérification d'idempotence
  if (processedEvents.has(event.id)) {
    return new Response(JSON.stringify({ received: true, duplicate: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  processedEvents.add(event.id)

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      console.log(`Paiement réussi: ${paymentIntent.id} — ${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`)
      // TODO: envoyer un email de confirmation, mettre à jour la commande, etc.
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      console.log(`Paiement échoué: ${paymentIntent.id} — ${paymentIntent.last_payment_error?.message}`)
      break
    }
    default:
      console.log(`Événement non géré: ${event.type}`)
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
