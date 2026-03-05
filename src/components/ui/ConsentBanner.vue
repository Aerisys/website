<script setup>
import { RouterLink } from 'vue-router'
import { useConsent } from '@/composables/useConsent'
import BaseButton from '@/components/ui/BaseButton.vue'

const { hasConsented, acceptConsent, refuseConsent } = useConsent()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="!hasConsented"
      class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
    >
      <div class="container-custom py-4 flex flex-col sm:flex-row items-center gap-4">
        <p class="text-sm text-gray-600 flex-1 text-center sm:text-left">
          Ce site utilise des cookies essentiels au fonctionnement et au traitement des paiements via Stripe.
          <RouterLink to="/politique-confidentialite" class="text-primary-600 hover:underline font-medium">En savoir plus</RouterLink>
        </p>
        <div class="flex gap-3 flex-shrink-0">
          <BaseButton variant="outline" size="sm" @click="refuseConsent">
            Refuser
          </BaseButton>
          <BaseButton variant="primary" size="sm" @click="acceptConsent">
            Accepter
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
