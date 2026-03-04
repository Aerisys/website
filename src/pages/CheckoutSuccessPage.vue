<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { clearCart } = useCart()
const status = ref('loading')

onMounted(() => {
  clearCart()

  const redirectStatus = route.query.redirect_status

  if (redirectStatus === 'succeeded') {
    status.value = 'success'
  } else if (redirectStatus === 'processing') {
    status.value = 'processing'
  } else if (redirectStatus) {
    status.value = 'error'
  } else {
    status.value = 'success'
  }
})
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
          <p class="text-gray-600 mb-8">
            Merci pour votre commande ! Vous recevrez un email de confirmation sous peu.
          </p>
        </template>

        <!-- En cours de traitement -->
        <template v-else-if="status === 'processing'">
          <div class="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div class="w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">Paiement en cours</h1>
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
