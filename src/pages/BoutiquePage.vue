<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useProductFilters } from '@/composables/useProductFilters'

const route = useRoute()
const { products, categories, loading, fetchProducts } = useProducts()
const {
  activeCategory, sortBy, searchQuery,
  priceMin, priceMax, priceMinEuros, priceMaxEuros, priceBoundsEuros,
  inStockOnly, activeTags, allTags, priceBounds,
  categoryCounts, filteredProducts, resetFilters, toggleTag
} = useProductFilters(products)

onMounted(async () => {
  await fetchProducts()
  if (route.query.category) {
    activeCategory.value = route.query.category
  }
})

watch(() => route.query.category, (val) => {
  if (val) activeCategory.value = val
})

const setCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? '' : id
}

// Mobile slide-out drawer
const drawerOpen = ref(false)
const openDrawer = () => { drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

// Tags collapse
const tagsExpanded = ref(false)

const hasActiveFilters = () => {
  return activeCategory.value || searchQuery.value || inStockOnly.value ||
    activeTags.value.length || priceMin.value !== priceBounds.value.min ||
    priceMax.value !== priceBounds.value.max
}
</script>

<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom">
      <SectionTitle
        label="Boutique"
        title="Nos "
        highlight="produits"
        :centered="true"
      />

      <div class="mt-10 flex gap-8">

        <!-- ======== DESKTOP SIDEBAR (lg+) ======== -->
        <aside class="hidden lg:block w-72 shrink-0">
          <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">

            <!-- Search -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-2">Recherche</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Rechercher un produit..."
                  class="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            <!-- Categories -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">Categories</label>
              <div class="space-y-1">
                <button
                  @click="setCategory('')"
                  class="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="activeCategory === '' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'"
                >
                  <span>Tous les produits</span>
                  <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" :class="activeCategory === '' && 'bg-primary-100 text-primary-600'">{{ products.length }}</span>
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  @click="setCategory(cat.id)"
                  class="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="activeCategory === cat.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'"
                >
                  <span>{{ cat.label }}</span>
                  <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" :class="activeCategory === cat.id && 'bg-primary-100 text-primary-600'">{{ categoryCounts[cat.id] || 0 }}</span>
                </button>
              </div>
            </div>

            <!-- Price range -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">Prix (&euro;)</label>
              <div class="flex items-center gap-3">
                <div class="flex-1">
                  <label class="text-xs text-gray-500 mb-1 block">Min</label>
                  <input
                    v-model.number="priceMinEuros"
                    type="number"
                    :min="priceBoundsEuros.min"
                    :max="priceMaxEuros"
                    step="1"
                    class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <span class="text-gray-300 mt-5">—</span>
                <div class="flex-1">
                  <label class="text-xs text-gray-500 mb-1 block">Max</label>
                  <input
                    v-model.number="priceMaxEuros"
                    type="number"
                    :min="priceMinEuros"
                    :max="priceBoundsEuros.max"
                    step="1"
                    class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Sort -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-2">Trier par</label>
              <select
                v-model="sortBy"
                class="w-full px-3 py-2.5 pr-8 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Nom (A-Z)</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
              </select>
            </div>

            <!-- Stock -->
            <div>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="inStockOnly" type="checkbox" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                <span class="text-sm text-gray-700">En stock uniquement</span>
              </label>
            </div>

            <!-- Tags (collapsed by default) -->
            <div>
              <button @click="tagsExpanded = !tagsExpanded" class="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3">
                <span>Tags</span>
                <svg class="w-4 h-4 text-gray-400 transition-transform" :class="tagsExpanded && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="activeTags.length && !tagsExpanded" class="flex flex-wrap gap-1.5 mb-2">
                <span v-for="tag in activeTags" :key="'active-'+tag" class="px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700 font-medium">{{ tag }}</span>
              </div>
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-show="tagsExpanded" class="flex flex-wrap gap-1.5 overflow-hidden">
                  <button
                    v-for="tag in allTags"
                    :key="tag"
                    @click="toggleTag(tag)"
                    class="px-2.5 py-1 text-xs rounded-full transition-colors"
                    :class="activeTags.includes(tag) ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    {{ tag }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Reset -->
            <button
              v-if="hasActiveFilters()"
              @click="resetFilters()"
              class="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        </aside>

        <!-- ======== MAIN CONTENT ======== -->
        <div class="flex-1 min-w-0">

          <!-- Top bar: mobile filter button + results count -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-600">
              <span class="font-semibold text-gray-900">{{ filteredProducts.length }}</span> produit{{ filteredProducts.length > 1 ? 's' : '' }}
            </p>
            <button
              @click="openDrawer"
              class="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium text-sm shadow-sm"
            >
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtres
              <span v-if="hasActiveFilters()" class="w-2 h-2 bg-primary-500 rounded-full"></span>
            </button>
          </div>

          <!-- Loading spinner -->
          <div v-if="loading" class="flex justify-center py-20">
            <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </div>

          <!-- Products grid -->
          <div
            v-else-if="filteredProducts.length"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="p in filteredProducts"
              :key="p.id"
              :product="p"
              :categoryLabel="categories.find(c => c.id === p.category)?.label ?? ''"
            />
          </div>

          <!-- Empty state -->
          <div v-else-if="!loading" class="text-center py-20">
            <svg class="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p class="text-gray-500 text-lg mb-2">Aucun produit ne correspond a vos filtres.</p>
            <button
              @click="resetFilters()"
              class="text-primary-600 font-medium hover:underline"
            >
              Effacer tous les filtres
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======== MOBILE SLIDE-OUT DRAWER ======== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="drawerOpen" class="fixed inset-0 z-50 lg:hidden">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40" @click="closeDrawer"></div>

          <!-- Drawer panel -->
          <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-200 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
            appear
          >
            <div class="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
              <!-- Drawer header -->
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">Filtres</h2>
                <button @click="closeDrawer" class="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Drawer body (scrollable) -->
              <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                <!-- Search -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Recherche</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Rechercher un produit..."
                      class="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>
                </div>

                <!-- Categories -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-3">Categories</label>
                  <div class="space-y-1">
                    <button
                      @click="setCategory('')"
                      class="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors"
                      :class="activeCategory === '' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'"
                    >
                      <span>Tous les produits</span>
                      <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" :class="activeCategory === '' && 'bg-primary-100 text-primary-600'">{{ products.length }}</span>
                    </button>
                    <button
                      v-for="cat in categories"
                      :key="cat.id"
                      @click="setCategory(cat.id)"
                      class="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors"
                      :class="activeCategory === cat.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'"
                    >
                      <span>{{ cat.label }}</span>
                      <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" :class="activeCategory === cat.id && 'bg-primary-100 text-primary-600'">{{ categoryCounts[cat.id] || 0 }}</span>
                    </button>
                  </div>
                </div>

                <!-- Price range -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-3">Prix (&euro;)</label>
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <label class="text-xs text-gray-500 mb-1 block">Min</label>
                      <input
                        v-model.number="priceMinEuros"
                        type="number"
                        :min="priceBoundsEuros.min"
                        :max="priceMaxEuros"
                        step="1"
                        class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <span class="text-gray-300 mt-5">—</span>
                    <div class="flex-1">
                      <label class="text-xs text-gray-500 mb-1 block">Max</label>
                      <input
                        v-model.number="priceMaxEuros"
                        type="number"
                        :min="priceMinEuros"
                        :max="priceBoundsEuros.max"
                        step="1"
                        class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <!-- Sort -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Trier par</label>
                  <select
                    v-model="sortBy"
                    class="w-full px-3 py-2.5 pr-8 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="name">Nom (A-Z)</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix decroissant</option>
                  </select>
                </div>

                <!-- Stock -->
                <div>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input v-model="inStockOnly" type="checkbox" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                    <span class="text-sm text-gray-700">En stock uniquement</span>
                  </label>
                </div>

                <!-- Tags (collapsed by default) -->
                <div>
                  <button @click="tagsExpanded = !tagsExpanded" class="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3">
                    <span>Tags</span>
                    <svg class="w-4 h-4 text-gray-400 transition-transform" :class="tagsExpanded && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="activeTags.length && !tagsExpanded" class="flex flex-wrap gap-1.5 mb-2">
                    <span v-for="tag in activeTags" :key="'m-active-'+tag" class="px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700 font-medium">{{ tag }}</span>
                  </div>
                  <div v-show="tagsExpanded" class="flex flex-wrap gap-1.5">
                    <button
                      v-for="tag in allTags"
                      :key="'m-'+tag"
                      @click="toggleTag(tag)"
                      class="px-2.5 py-1 text-xs rounded-full transition-colors"
                      :class="activeTags.includes(tag) ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                    >
                      {{ tag }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Drawer footer -->
              <div class="px-6 py-4 border-t border-gray-100 space-y-3">
                <button
                  v-if="hasActiveFilters()"
                  @click="resetFilters()"
                  class="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Effacer les filtres
                </button>
                <button
                  @click="closeDrawer"
                  class="w-full px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Voir {{ filteredProducts.length }} produit{{ filteredProducts.length > 1 ? 's' : '' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
