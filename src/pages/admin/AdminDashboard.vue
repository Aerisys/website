<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { authFetch } = useAuth()

const products = ref([])
const loadingProducts = ref(true)
const searchQuery = ref('')

const filteredProducts = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return products.value
  return products.value.filter(p =>
    (p.name || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q)
  )
})

async function fetchProducts() {
  loadingProducts.value = true
  try {
    const res = await authFetch('/api/admin/products')
    const data = await res.json()
    products.value = data.products || []
  } catch (err) {
    console.error('Erreur chargement produits:', err)
  } finally {
    loadingProducts.value = false
  }
}

async function deleteProduct(id, name) {
  if (!confirm(`Supprimer "${name}" ?`)) return
  try {
    await authFetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    products.value = products.value.filter(p => p.id !== id)
  } catch (err) {
    console.error('Erreur suppression:', err)
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="min-h-screen bg-aerisys-gray">
    <AdminHeader activePage="products" />

    <main class="container-custom py-8">
      <!-- Title section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">Gestion</p>
          <h1 class="text-2xl font-bold font-display text-gray-900">Produits</h1>
        </div>
        <router-link :to="{ name: 'admin-product-new' }">
          <BaseButton variant="primary">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau produit
          </BaseButton>
        </router-link>
      </div>

      <!-- Search bar -->
      <div class="mb-6">
        <div class="relative max-w-md">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom ou categorie..."
            class="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loadingProducts" class="flex items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
        <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p class="text-gray-500 mb-4">{{ searchQuery ? 'Aucun produit ne correspond a votre recherche.' : 'Aucun produit.' }}</p>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Effacer la recherche
        </button>
      </div>

      <!-- Products grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all duration-300 overflow-hidden"
        >
          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              v-if="product.images && product.images.length"
              :src="product.images[0]"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <!-- Category badge -->
            <span v-if="product.category" class="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full mb-3">
              {{ product.category }}
            </span>

            <h3 class="text-base font-semibold text-gray-900 mb-2">{{ product.name }}</h3>

            <div class="flex items-center justify-between mb-4">
              <span class="text-lg font-bold text-gray-900">{{ (product.price / 100).toFixed(2) }}&nbsp;&euro;</span>
              <span
                class="text-xs font-semibold px-2 py-1 rounded-full"
                :class="product.inStock ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'"
              >
                {{ product.inStock ? 'En stock' : 'Rupture' }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <router-link :to="{ name: 'admin-product-edit', params: { id: product.id } }" class="flex-1">
                <BaseButton variant="outline" size="sm" class="w-full">
                  Modifier
                </BaseButton>
              </router-link>
              <button
                @click="deleteProduct(product.id, product.name)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
