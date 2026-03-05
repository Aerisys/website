<script setup>
import { ref, computed, provide } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/ui/CartDrawer.vue'
import ConsentBanner from '@/components/ui/ConsentBanner.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/boutique/admin'))

const cartDrawerOpen = ref(false)
provide('cartDrawerOpen', cartDrawerOpen)
</script>

<template>
  <div class="min-h-screen">
    <template v-if="isAdminRoute">
      <RouterView />
    </template>
    <template v-else>
      <AppHeader />
      <RouterView />
      <AppFooter />
      <CartDrawer />
      <ConsentBanner />
    </template>
  </div>
</template>
