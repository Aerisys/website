<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  activePage: {
    type: String,
    default: 'products',
    validator: (v) => ['products', 'orders'].includes(v)
  }
})

const router = useRouter()
const { logout } = useAuth()

async function handleLogout() {
  await logout()
  router.replace({ name: 'admin-login' })
}
</script>

<template>
  <header class="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
    <div class="container-custom flex items-center justify-between h-16">
      <!-- Left: Logo + Badge + Nav -->
      <div class="flex items-center gap-6">
        <router-link :to="{ name: 'admin-dashboard' }" class="flex items-center gap-2">
          <img src="/logo/black.svg" alt="Logo" class="h-8 w-8" />
          <span class="text-lg font-bold font-display text-gray-900 leading-none translate-y-0.5">AERISYS</span>
        </router-link>
        <span class="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">Admin</span>
        <nav class="flex items-center gap-1">
          <router-link
            :to="{ name: 'admin-dashboard' }"
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
            :class="activePage === 'products' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'"
          >
            Produits
          </router-link>
          <router-link
            :to="{ name: 'admin-orders' }"
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
            :class="activePage === 'orders' ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'"
          >
            Commandes
          </router-link>
        </nav>
      </div>

      <!-- Right: Shop + Logout -->
      <div class="flex items-center gap-3">
        <router-link :to="{ name: 'boutique' }">
          <BaseButton variant="outline" size="sm">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Boutique
          </BaseButton>
        </router-link>
        <button
          @click="handleLogout"
          class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Deconnexion
        </button>
      </div>
    </div>
  </header>
</template>
