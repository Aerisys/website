<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />

    <RouterView />

    <AppFooter />
  </div>
</template>
