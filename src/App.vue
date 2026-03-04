<script setup>
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/ui/CartDrawer.vue'
import ConsentBanner from '@/components/ui/ConsentBanner.vue'

const cartDrawerOpen = ref(false)
provide('cartDrawerOpen', cartDrawerOpen)
</script>

<template>
    <div class="min-h-screen">
        <AppHeader/>

        <RouterView/>

    <AppFooter />

    <CartDrawer />
    <ConsentBanner />
  </div>
</template>
