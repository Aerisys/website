<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'
import BaseButton from '@/components/ui/BaseButton.vue'

const cartDrawerOpen = inject('cartDrawerOpen')
const { items, cartTotal, cartCount, isEmpty, removeFromCart, updateQuantity } = useCart()

function close() {
  cartDrawerOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cartDrawerOpen"
        class="fixed inset-0 bg-black/40 z-[60]"
        @click="close"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="cartDrawerOpen"
        class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">
            Votre panier ({{ cartCount }})
          </h2>
          <button
            @click="close"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <!-- Empty state -->
          <div v-if="isEmpty" class="flex flex-col items-center justify-center h-full text-center">
            <img src="/icons/shopping-cart.svg" alt="Panier vide" class="w-16 h-16 opacity-30 mb-4" />
            <p class="text-gray-500 mb-4">Votre panier est vide</p>
            <RouterLink to="/boutique" @click="close">
              <BaseButton variant="primary" size="sm">
                Voir la boutique
              </BaseButton>
            </RouterLink>
          </div>

          <!-- Items list -->
          <ul v-else class="space-y-4">
            <li
              v-for="item in items"
              :key="item.slug"
              class="flex gap-4 bg-gray-50 rounded-xl p-3"
            >
              <!-- Thumbnail -->
              <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ (item.price / 100).toFixed(2) }} &euro;</p>

                <!-- Quantity controls -->
                <div class="flex items-center gap-2 mt-2">
                  <button
                    @click="updateQuantity(item.slug, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    &minus;
                  </button>
                  <span class="text-sm font-medium text-gray-900 w-6 text-center">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.slug, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Line total + remove -->
              <div class="flex flex-col items-end justify-between">
                <span class="text-sm font-semibold text-gray-900">
                  {{ ((item.price * item.quantity) / 100).toFixed(2) }} &euro;
                </span>
                <button
                  @click="removeFromCart(item.slug)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Footer -->
        <div v-if="!isEmpty" class="border-t border-gray-100 px-6 py-4 space-y-4">
          <div class="flex justify-between text-base font-semibold text-gray-900">
            <span>Total</span>
            <span>{{ (cartTotal / 100).toFixed(2) }} &euro;</span>
          </div>
          <RouterLink to="/checkout" @click="close">
            <BaseButton variant="primary" size="lg" class="w-full">
              Commander
            </BaseButton>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
