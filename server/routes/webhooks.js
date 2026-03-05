import { Router } from 'express'
import express from 'express'
import stripe from '../lib/stripe.js'

const router = Router()

router.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: 'Signature invalide' })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object
      const orderNumber = pi.metadata?.order_number || 'N/A'
      const customerName = pi.metadata?.customer_name || 'N/A'
      const customerEmail = pi.metadata?.customer_email || pi.receipt_email || 'N/A'
      console.log(`[COMMANDE CONFIRMÉE] ${orderNumber} — ${(pi.amount / 100).toFixed(2)} ${pi.currency.toUpperCase()} — Client: ${customerName} (${customerEmail})`)
      break
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object
      const orderNumber = pi.metadata?.order_number || 'N/A'
      console.log(`[PAIEMENT ÉCHOUÉ] ${orderNumber} — ${pi.id} — Raison: ${pi.last_payment_error?.message || 'inconnue'}`)
      break
    }
    case 'charge.refunded': {
      const charge = event.data.object
      console.log(`[REMBOURSEMENT] Charge ${charge.id} — ${(charge.amount_refunded / 100).toFixed(2)} ${charge.currency.toUpperCase()}`)
      break
    }
    case 'charge.dispute.created': {
      const dispute = event.data.object
      console.log(`[LITIGE OUVERT] Dispute ${dispute.id} — Charge ${dispute.charge} — Raison: ${dispute.reason}`)
      break
    }
    default:
      console.log(`[STRIPE EVENT] ${event.type}`)
  }

  res.json({ received: true })
})

export default router
