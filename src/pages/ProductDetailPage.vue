<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { products, categories } from '@/data/products'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { addToCart } = useCart()
const cartDrawerOpen = inject('cartDrawerOpen')

const product = computed(() => products.find(p => p.slug === route.params.slug))
const categoryLabel = computed(() =>
  categories.find(c => c.id === product.value?.category)?.label ?? ''
)

const selectedImage = ref(0)
const addedFeedback = ref(false)

function handleAddToCart() {
  if (!product.value) return
  addToCart(product.value, 1)
  addedFeedback.value = true
  cartDrawerOpen.value = true
  setTimeout(() => { addedFeedback.value = false }, 1500)
}
</script>

<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom">
      <!-- 404 state -->
      <div v-if="!product" class="text-center py-20">
        <p class="text-gray-500 text-lg mb-4">Produit introuvable.</p>
        <RouterLink to="/boutique" class="text-primary-600 font-medium hover:underline">
          Retour à la boutique
        </RouterLink>
      </div>

      <template v-else>
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <RouterLink to="/" class="hover:text-primary-600 transition-colors">Accueil</RouterLink>
          <span>/</span>
          <RouterLink to="/boutique" class="hover:text-primary-600 transition-colors">Boutique</RouterLink>
          <span>/</span>
          <span class="text-gray-900 font-medium">{{ product.name }}</span>
        </nav>

        <!-- Product layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Image gallery -->
          <div>
            <!-- Main image -->
            <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                :src="product.images[selectedImage]"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Thumbnails -->
            <div v-if="product.images.length > 1" class="flex gap-3">
              <button
                v-for="(img, i) in product.images"
                :key="i"
                @click="selectedImage = i"
                class="w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors"
                :class="selectedImage === i ? 'border-primary-500' : 'border-transparent hover:border-gray-300'"
              >
                <img :src="img" :alt="`${product.name} ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product info -->
          <div>
            <!-- Category badge -->
            <span class="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full mb-3">
              {{ categoryLabel }}
            </span>

            <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {{ product.name }}
            </h1>

            <p class="text-gray-600 leading-relaxed mb-6">
              {{ product.description }}
            </p>

            <!-- Price & stock -->
            <div class="flex items-center gap-4 mb-8">
              <span class="text-3xl font-bold text-gray-900">
                {{ (product.price / 100).toFixed(2) }}&nbsp;&euro;
              </span>
              <span
                v-if="product.inStock"
                class="text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full"
              >
                En stock
              </span>
              <span
                v-else
                class="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full"
              >
                Rupture de stock
              </span>
            </div>

            <!-- Add to cart button -->
            <BaseButton
              variant="primary"
              size="lg"
              :disabled="!product.inStock"
              class="w-full sm:w-auto"
              @click="handleAddToCart"
            >
              {{ addedFeedback ? 'Ajouté !' : 'Ajouter au panier' }}
            </BaseButton>

            <!-- Specs table -->
            <div v-if="product.specs.length" class="mt-10">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Caractéristiques</h3>
              <div class="rounded-xl border border-gray-200 overflow-hidden">
                <div
                  v-for="(spec, i) in product.specs"
                  :key="spec.label"
                  class="flex justify-between px-4 py-3 text-sm"
                  :class="i % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                >
                  <span class="text-gray-600">{{ spec.label }}</span>
                  <span class="font-medium text-gray-900">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="product.tags.length" class="mt-8 flex flex-wrap gap-2">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>
