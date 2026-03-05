<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { cartCount } = useCart()
const cartDrawerOpen = inject('cartDrawerOpen')

const hasScrolled = ref(false)

const heroRoutes = ['/', '/app']
const isScrolled = computed(() => hasScrolled.value || !heroRoutes.includes(route.path))
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Le projet', href: '#projet' },
  { name: 'L\'équipe', href: '#equipe' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Application mobile', href: '/app' }
]

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

function openCart() {
  cartDrawerOpen.value = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
  >
    <div class="container-custom">
      <nav class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <img
            :src="isScrolled ? '/logo/black.svg' : '/logo/white.svg'"
            alt="Logo"
            class="h-10 w-10 ml-0"
          />
          <span
            class="text-xl font-bold font-display transition-colors leading-none translate-y-1"
            :class="isScrolled ? 'text-gray-900' : 'text-white'"
          >
            AERISYS
          </span>
        </RouterLink>
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'">
        <div class="container-custom">
            <nav aria-label="Navigation principale" class="flex items-center justify-between h-16 md:h-20">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center gap-2" aria-label="Aerisys - Accueil">
                    <img :src="isScrolled ? '/logo/black.svg' : '/logo/white.svg'"
                         alt="Logo Aerisys"
                         class="h-10 w-10 ml-0"/>
                    <span class="text-xl font-bold font-display transition-colors"
                          :class="isScrolled ? 'text-gray-900' : 'text-white'">
                        AERISYS
                    </span>
                </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <template v-for="link in navLinks" :key="link.name">
            <RouterLink
              v-if="link.href.startsWith('/')"
              :to="link.href"
              class="text-sm font-medium transition-colors hover:text-primary-500"
              :class="isScrolled ? 'text-gray-700' : 'text-white/90'"
            >
              {{ link.name }}
            </RouterLink>
            <RouterLink
              v-else-if="link.href.startsWith('#')"
              :to="{ path: '/', hash: link.href }"
              class="text-sm font-medium transition-colors hover:text-primary-500"
              :class="isScrolled ? 'text-gray-700' : 'text-white/90'"
            >
              {{ link.name }}
            </RouterLink>
            <a
              v-else
              :href="link.href"
              class="text-sm font-medium transition-colors hover:text-primary-500"
              :class="isScrolled ? 'text-gray-700' : 'text-white/90'"
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <!-- CTA Button + Cart (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink to="/boutique">
            <BaseButton variant="primary" size="md">
              Boutique
            </BaseButton>
          </RouterLink>

          <button
            @click="openCart"
            class="relative p-2 rounded-lg transition-colors"
            :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </button>
        </div>

        <!-- Mobile: Cart + Menu Button -->
        <div class="flex md:hidden items-center gap-2">
          <button
            @click="openCart"
            class="relative p-2 rounded-lg"
            :class="isScrolled ? 'text-gray-700' : 'text-white'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </button>

          <button
            class="p-2 rounded-lg"
            :class="isScrolled ? 'text-gray-700' : 'text-white'"
            @click="toggleMobileMenu"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-100 shadow-lg"
      >
        <div class="container-custom py-4 space-y-3">
          <template v-for="link in navLinks" :key="link.name">
            <RouterLink
              v-if="link.href.startsWith('/')"
              :to="link.href"
              class="block py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </RouterLink>
            <RouterLink
              v-else-if="link.href.startsWith('#')"
              :to="{ path: '/', hash: link.href }"
              class="block py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </RouterLink>
            <a
              v-else
              :href="link.href"
              class="block py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </a>
          </template>
          <RouterLink to="/boutique" @click="closeMobileMenu">
            <BaseButton variant="primary" size="md" class="w-full mt-4">
              Boutique
            </BaseButton>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
