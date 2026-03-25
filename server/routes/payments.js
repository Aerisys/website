import { Router } from 'express'
import stripe from '../lib/stripe.js'
import { generateOrderNumber } from '../lib/helpers.js'

const router = Router()

router.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', customerName, customerEmail, cartItems } = req.body

    // Validation montant
    if (!amount || typeof amount !== 'number' || !Number.isInteger(amount) || amount < 50) {
      return res.status(400).json({ error: 'Montant invalide (minimum 50 centimes)' })
    }

    if (amount > 99999999) {
      return res.status(400).json({ error: 'Montant trop élevé' })
    }

    // Validation devise
    const allowedCurrencies = ['eur', 'usd', 'gbp']
    if (!allowedCurrencies.includes(currency)) {
      return res.status(400).json({ error: 'Devise non supportée' })
    }

    const orderNumber = generateOrderNumber()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: { enabled: true },
      ...(customerEmail && { receipt_email: customerEmail }),
      metadata: {
        order_number: orderNumber,
        ...(customerName && { customer_name: customerName }),
        ...(customerEmail && { customer_email: customerEmail }),
        ...(cartItems && { cart_summary: cartItems })
      }
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Stripe error:', error.message)
    res.status(500).json({ error: 'Erreur lors de la création du paiement' })
  }
})

router.get('/api/verify-payment', async (req, res) => {
  try {
    const { payment_intent: paymentIntentId } = req.query

    if (!paymentIntentId || typeof paymentIntentId !== 'string' || !paymentIntentId.startsWith('pi_')) {
      return res.status(400).json({ error: 'ID de paiement invalide' })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    res.json({
      status: paymentIntent.status,
      orderNumber: paymentIntent.metadata?.order_number || null,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customerName: paymentIntent.metadata?.customer_name || null,
      customerEmail: paymentIntent.metadata?.customer_email || paymentIntent.receipt_email || null,
      cartSummary: paymentIntent.metadata?.cart_summary || null
    })
  } catch (error) {
    console.error('Verify payment error:', error.message)
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(404).json({ error: 'Paiement introuvable' })
    }
    res.status(500).json({ error: 'Erreur lors de la vérification du paiement' })
  }
})

export default router
