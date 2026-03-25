<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import AdminHeader from '@/components/admin/AdminHeader.vue'

const { authFetch } = useAuth()

const orders = ref([])
const loadingOrders = ref(true)
const searchQuery = ref('')

const filteredOrders = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return orders.value
  return orders.value.filter(o =>
    (o.orderNumber || '').toLowerCase().includes(q) ||
    (o.customerName || '').toLowerCase().includes(q) ||
    (o.customerEmail || '').toLowerCase().includes(q)
  )
})

async function fetchOrders() {
  loadingOrders.value = true
  try {
    const res = await authFetch('/api/admin/orders')
    const data = await res.json()
    orders.value = data.orders || []
  } catch (err) {
    console.error('Erreur chargement commandes:', err)
  } finally {
    loadingOrders.value = false
  }
}

function formatDate(timestamp) {
  if (!timestamp) return '—'
  const ms = timestamp._seconds ? timestamp._seconds * 1000 : timestamp
  return new Date(ms).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

async function deleteOrder(id) {
  if (!confirm('Supprimer cette commande ?')) return
  try {
    await authFetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
    orders.value = orders.value.filter(o => o.id !== id)
  } catch (err) {
    console.error('Erreur suppression:', err)
  }
}

onMounted(fetchOrders)
</script>

<template>
  <div class="min-h-screen bg-aerisys-gray">
    <AdminHeader activePage="orders" />

    <main class="container-custom py-8">
      <!-- Title section -->
      <div class="mb-8">
        <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">Suivi</p>
        <h1 class="text-2xl font-bold font-display text-gray-900">Commandes</h1>
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
            placeholder="Rechercher par numero, nom ou email..."
            class="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loadingOrders" class="flex items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredOrders.length === 0" class="text-center py-20">
        <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-500 mb-4">{{ searchQuery ? 'Aucune commande ne correspond a votre recherche.' : 'Aucune commande.' }}</p>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Effacer la recherche
        </button>
      </div>

      <!-- Table card -->
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50/50">
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">N° commande</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Client</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Articles</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Montant</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-mono text-xs text-gray-900">{{ order.orderNumber }}</td>
                <td class="px-6 py-4">
                  <div class="text-gray-900">{{ order.customerName }}</div>
                  <div class="text-gray-500 text-xs">{{ order.customerEmail }}</div>
                </td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">{{ order.cartSummary }}</td>
                <td class="px-6 py-4 font-semibold text-gray-900">{{ (order.amount / 100).toFixed(2) }} {{ (order.currency || 'eur').toUpperCase() }}</td>
                <td class="px-6 py-4 text-gray-500">{{ formatDate(order.createdAt) }}</td>
                <td class="px-6 py-4">
                  <button
                    @click="deleteOrder(order.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
