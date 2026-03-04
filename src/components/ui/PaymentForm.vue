<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'eur'
  },
  customerName: {
    type: String,
    default: ''
  },
  customerEmail: {
    type: String,
    default: ''
  }
})

const stripeElementRef = ref(null)
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

let stripe = null
let elements = null
let paymentElement = null

onMounted(async () => {
  try {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

    if (!stripe) {
      errorMessage.value = 'Impossible de charger Stripe. Veuillez réessayer.'
      isLoading.value = false
      return
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: props.amount,
        currency: props.currency,
        customerName: props.customerName,
        customerEmail: props.customerEmail
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Erreur serveur')
    }

    const { clientSecret } = await response.json()

    elements = stripe.elements({
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#dc2626',
          fontFamily: '"Neue Haas Grotesk Text Pro", system-ui, sans-serif',
          borderRadius: '8px',
          spacingUnit: '4px'
        }
      },
      locale: 'fr'
    })

    paymentElement = elements.create('payment')
    paymentElement.mount(stripeElementRef.value)

    isLoading.value = false
  } catch (err) {
    errorMessage.value = err.message || 'Une erreur est survenue lors de l\'initialisation du paiement.'
    isLoading.value = false
  }
})

onBeforeUnmount(() => {
  if (paymentElement) {
    paymentElement.destroy()
  }
})

const handleSubmit = async () => {
  if (!stripe || !elements || isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/checkout/success`,
      payment_method_data: {
        billing_details: {
          name: props.customerName,
          email: props.customerEmail
        }
      }
    }
  })

  // Ce point n'est atteint qu'en cas d'erreur immédiate
  // (carte refusée, etc.) — les paiements réussis redirigent automatiquement
  if (error) {
    if (error.type === 'card_error' || error.type === 'validation_error') {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur inattendue est survenue. Veuillez réessayer.'
    }
  }

  isSubmitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Chargement -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      <span class="ml-3 text-gray-600">Chargement du formulaire de paiement...</span>
    </div>

    <!-- Stripe Payment Element -->
    <div ref="stripeElementRef" :class="{ 'hidden': isLoading }"></div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-700 text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Bouton de paiement -->
    <BaseButton
      v-if="!isLoading"
      variant="primary"
      size="lg"
      :disabled="isSubmitting || isLoading"
      class="w-full"
    >
      <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
        <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        Traitement en cours...
      </span>
      <span v-else>
        Payer {{ (amount / 100).toFixed(2) }} {{ currency.toUpperCase() }}
      </span>
    </BaseButton>
  </form>
</template>
