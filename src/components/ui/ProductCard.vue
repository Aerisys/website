<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  categoryLabel: {
    type: String,
    default: ''
  }
})

const { addToCart } = useCart()
const cartDrawerOpen = inject('cartDrawerOpen')

function handleAdd(e) {
  e.preventDefault()
  e.stopPropagation()
  addToCart(props.product, 1)
  cartDrawerOpen.value = true
}
</script>

<template>
  <RouterLink
    :to="{ name: 'product-detail', params: { slug: product.slug } }"
    class="group relative block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all duration-300 overflow-hidden"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <!-- Add to cart button overlay -->
      <button
        v-if="product.inStock"
        @click="handleAdd"
        class="absolute bottom-3 right-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-700"
        title="Ajouter au panier"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Category badge -->
      <span class="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full mb-3">
        {{ categoryLabel }}
      </span>

      <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
        {{ product.name }}
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
        {{ product.shortDescription }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-gray-900">
          {{ (product.price / 100).toFixed(2) }}&nbsp;&euro;
        </span>
        <span
          v-if="!product.inStock"
          class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full"
        >
          Rupture
        </span>
      </div>
    </div>
  </RouterLink>
</template>
