import { reactive, computed, watch } from 'vue'

const STORAGE_KEY = 'aerisys-cart'

function loadCart() {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const state = reactive({
  items: loadCart()
})

watch(
  () => state.items,
  (items) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  { deep: true }
)

export function useCart() {
  const cartTotal = computed(() =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const cartCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  const isEmpty = computed(() => state.items.length === 0)

  function addToCart(product, qty = 1) {
    const existing = state.items.find(item => item.slug === product.slug)
    if (existing) {
      existing.quantity += qty
    } else {
      state.items.push({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] ?? '',
        quantity: qty
      })
    }
  }

  function removeFromCart(slug) {
    const index = state.items.findIndex(item => item.slug === slug)
    if (index !== -1) state.items.splice(index, 1)
  }

  function updateQuantity(slug, qty) {
    const item = state.items.find(item => item.slug === slug)
    if (!item) return
    if (qty <= 0) {
      removeFromCart(slug)
    } else {
      item.quantity = qty
    }
  }

  function clearCart() {
    state.items.splice(0, state.items.length)
  }

  return {
    items: state.items,
    cartTotal,
    cartCount,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}
