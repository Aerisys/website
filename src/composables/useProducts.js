import { ref } from 'vue'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const loaded = ref(false)

async function fetchProducts() {
  if (loaded.value || loading.value) return
  loading.value = true

  try {
    const res = await fetch('/api/products')
    const data = await res.json()
    products.value = data.products
    categories.value = data.categories
    loaded.value = true
  } catch (err) {
    console.error('Failed to fetch products:', err)
  } finally {
    loading.value = false
  }
}

export function useProducts() {
  return { products, categories, loading, loaded, fetchProducts }
}
