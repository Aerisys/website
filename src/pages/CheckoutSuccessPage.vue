<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { clearCart } = useCart()

const status = ref('loading')
const orderNumber = ref(null)
const orderAmount = ref(null)
const orderCurrency = ref(null)
const customerName = ref(null)
const cartSummary = ref(null)

onMounted(async () => {
  const paymentIntentId = route.query.payment_intent
  const redirectStatus = route.query.redirect_status

  // Pas de payment_intent dans l'URL = accès direct non autorisé
  if (!paymentIntentId || !paymentIntentId.startsWith('pi_')) {
    status.value = 'invalid'
    return
  }

  // Si Stripe indique un échec immédiat
  if (redirectStatus && redirectStatus !== 'succeeded' && redirectStatus !== 'processing') {
    status.value = 'error'
    return
  }

  try {
    const response = await fetch(`/api/verify-payment?payment_intent=${encodeURIComponent(paymentIntentId)}`)

    if (!response.ok) {
      status.value = 'error'
      return
    }

    const data = await response.json()

    if (data.status === 'succeeded') {
      clearCart()
      status.value = 'success'
      orderNumber.value = data.orderNumber
      orderAmount.value = data.amount
      orderCurrency.value = data.currency
      customerName.value = data.customerName
      cartSummary.value = data.cartSummary
    } else if (data.status === 'processing') {
      clearCart()
      status.value = 'processing'
      orderNumber.value = data.orderNumber
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
})

function formatAmount(amount, currency) {
  if (!amount || !currency) return ''
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100)
}
</script>

<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom">
      <div class="max-w-lg mx-auto text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

        <!-- Succès -->
        <template v-if="status === 'success'">
          <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">Paiement confirmé</h1>

          <!-- Récapitulatif commande -->
          <div class="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-3">
            <div v-if="orderNumber" class="flex justify-between text-sm">
              <span class="text-gray-500">N° de commande</span>
              <span class="font-semibold text-gray-900 font-mono">{{ orderNumber }}</span>
            </div>
            <div v-if="customerName" class="flex justify-between text-sm">
              <span class="text-gray-500">Client</span>
              <span class="font-medium text-gray-900">{{ customerName }}</span>
            </div>
            <div v-if="cartSummary" class="flex justify-between text-sm">
              <span class="text-gray-500">Articles</span>
              <span class="font-medium text-gray-900 text-right max-w-[60%]">{{ cartSummary }}</span>
            </div>
            <div v-if="orderAmount" class="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span class="text-gray-500 font-medium">Total payé</span>
              <span class="font-bold text-gray-900">{{ formatAmount(orderAmount, orderCurrency) }}</span>
            </div>
          </div>

          <p class="text-gray-600 mb-8">
            Un reçu Stripe a été envoyé à votre adresse email.
          </p>
        </template>

        <!-- En cours de traitement -->
        <template v-else-if="status === 'processing'">
          <div class="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div class="w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">Paiement en cours</h1>
          <p v-if="orderNumber" class="text-sm text-gray-500 mb-2 font-mono">{{ orderNumber }}</p>
          <p class="text-gray-600 mb-8">
            Votre paiement est en cours de traitement. Vous recevrez une confirmation par email.
          </p>
        </template>

        <!-- Erreur -->
        <template v-else-if="status === 'error'">
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">Paiement échoué</h1>
          <p class="text-gray-600 mb-8">
            Le paiement n'a pas pu être traité. Veuillez réessayer ou utiliser un autre moyen de paiement.
          </p>
          <BaseButton variant="outline" href="/checkout" class="mb-4">
            Réessayer le paiement
          </BaseButton>
        </template>

        <!-- Accès non autorisé (pas de payment_intent dans l'URL) -->
        <template v-else-if="status === 'invalid'">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">Page non accessible</h1>
          <p class="text-gray-600 mb-8">
            Cette page n'est accessible qu'après un paiement valide.
          </p>
        </template>

        <!-- Chargement -->
        <template v-else>
          <div class="flex items-center justify-center py-12">
            <div class="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </template>

        <div class="mt-4">
          <BaseButton variant="primary" href="/">
            Retour à l'accueil
          </BaseButton>
        </div>
      </div>
    </div>
  </main>
</template>
