import { ref, computed, watch } from 'vue'

export function useProductFilters(productsRef, initialCategory = '') {
  const activeCategory = ref(initialCategory)
  const sortBy = ref('name')
  const searchQuery = ref('')
  const inStockOnly = ref(false)
  const activeTags = ref([])

  // Price boundaries computed reactively from productsRef
  const priceBounds = computed(() => {
    if (!productsRef.value.length) return { min: 0, max: 0 }
    return {
      min: Math.min(...productsRef.value.map(p => p.price)),
      max: Math.max(...productsRef.value.map(p => p.price))
    }
  })

  const priceMin = ref(0)
  const priceMax = ref(0)

  // Init price range when products arrive
  watch(priceBounds, (bounds) => {
    if (bounds.min !== bounds.max || bounds.min !== 0) {
      priceMin.value = bounds.min
      priceMax.value = bounds.max
    }
  }, { immediate: true })

  // Euro getters/setters for UI inputs
  const priceMinEuros = computed({
    get: () => Math.round(priceMin.value / 100),
    set: (v) => { priceMin.value = (v || 0) * 100 }
  })
  const priceMaxEuros = computed({
    get: () => Math.round(priceMax.value / 100),
    set: (v) => { priceMax.value = (v || 0) * 100 }
  })
  const priceBoundsEuros = computed(() => ({
    min: Math.round(priceBounds.value.min / 100),
    max: Math.round(priceBounds.value.max / 100)
  }))

  // All unique tags from products
  const allTags = computed(() => {
    const set = new Set()
    productsRef.value.forEach(p => p.tags.forEach(t => set.add(t)))
    return [...set].sort()
  })

  // Product count per category (always based on full catalog)
  const categoryCounts = computed(() => {
    const counts = {}
    productsRef.value.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  })

  const filteredProducts = computed(() => {
    let result = [...productsRef.value]

    // Filter by category
    if (activeCategory.value) {
      result = result.filter(p => p.category === activeCategory.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceMin.value && p.price <= priceMax.value)

    // Filter by stock
    if (inStockOnly.value) {
      result = result.filter(p => p.inStock)
    }

    // Filter by tags
    if (activeTags.value.length) {
      result = result.filter(p =>
        activeTags.value.every(t => p.tags.includes(t))
      )
    }

    // Sort
    if (sortBy.value === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy.value === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy.value === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  })

  const resetFilters = () => {
    activeCategory.value = ''
    sortBy.value = 'name'
    searchQuery.value = ''
    priceMin.value = priceBounds.value.min
    priceMax.value = priceBounds.value.max
    inStockOnly.value = false
    activeTags.value = []
  }

  const toggleTag = (tag) => {
    const idx = activeTags.value.indexOf(tag)
    if (idx === -1) {
      activeTags.value = [...activeTags.value, tag]
    } else {
      activeTags.value = activeTags.value.filter(t => t !== tag)
    }
  }

  return {
    activeCategory,
    sortBy,
    searchQuery,
    priceMin,
    priceMax,
    priceMinEuros,
    priceMaxEuros,
    priceBoundsEuros,
    inStockOnly,
    activeTags,
    allTags,
    priceBounds,
    categoryCounts,
    filteredProducts,
    resetFilters,
    toggleTag
  }
}
