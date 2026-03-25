<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { authFetch } = useAuth()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)
const categories = ref([])

const form = ref({
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  price: 0,
  images: '',
  category: '',
  tags: '',
  inStock: true
})

const specs = ref([])

function addSpec() {
  specs.value.push({ label: '', value: '' })
}

function removeSpec(index) {
  specs.value.splice(index, 1)
}

async function fetchCategories() {
  try {
    const res = await authFetch('/api/admin/categories')
    const data = await res.json()
    categories.value = data.categories || []
  } catch (err) {
    console.error('Erreur chargement categories:', err)
  }
}

async function fetchProduct() {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await authFetch(`/api/admin/products`)
    const data = await res.json()
    const product = (data.products || []).find(p => p.id === route.params.id)
    if (product) {
      form.value = {
        name: product.name || '',
        slug: product.slug || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        price: product.price || 0,
        images: Array.isArray(product.images) ? product.images.join(', ') : '',
        category: product.category || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
        inStock: product.inStock ?? true
      }
      specs.value = (product.specs || []).map(s => ({ label: s.label || '', value: s.value || '' }))
      if (specs.value.length === 0) {
        specs.value.push({ label: '', value: '' })
      }
    }
  } catch (err) {
    console.error('Erreur chargement produit:', err)
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  saving.value = true
  try {
    const body = {
      name: form.value.name,
      slug: form.value.slug || undefined,
      shortDescription: form.value.shortDescription,
      description: form.value.description,
      price: Number(form.value.price),
      images: form.value.images.split(',').map(s => s.trim()).filter(Boolean),
      category: form.value.category,
      tags: form.value.tags.split(',').map(s => s.trim()).filter(Boolean),
      specs: specs.value.filter(s => s.label.trim() && s.value.trim()),
      inStock: form.value.inStock
    }

    const url = isEdit.value ? `/api/admin/products/${route.params.id}` : '/api/admin/products'
    const method = isEdit.value ? 'PUT' : 'POST'

    await authFetch(url, { method, body: JSON.stringify(body) })
    router.push({ name: 'admin-dashboard' })
  } catch (err) {
    console.error('Erreur sauvegarde:', err)
    alert('Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchProduct()
})
</script>

<template>
  <div class="min-h-screen bg-aerisys-gray">
    <AdminHeader activePage="products" />

    <main class="container-custom py-8 max-w-2xl">
      <!-- Title section -->
      <div class="mb-8">
        <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">
          {{ isEdit ? 'Modification' : 'Creation' }}
        </p>
        <h1 class="text-2xl font-bold font-display text-gray-900">
          {{ isEdit ? 'Modifier le produit' : 'Nouveau produit' }}
        </h1>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>

      <!-- Form card -->
      <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="form.name"
            required
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug (auto-genere si vide)</label>
          <input
            v-model="form.slug"
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
          <input
            v-model="form.shortDescription"
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prix (centimes)</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Images (URLs separees par des virgules)</label>
          <input
            v-model="form.images"
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
          <select
            v-model="form.category"
            required
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="" disabled>Selectionner...</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.label }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags (separes par des virgules)</label>
          <input
            v-model="form.tags"
            class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">Caracteristiques</label>
            <button
              type="button"
              @click="addSpec"
              class="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          </div>
          <div v-if="specs.length === 0" class="text-sm text-gray-400 italic">
            Aucune caracteristique. Cliquez sur "Ajouter" pour en creer une.
          </div>
          <div class="space-y-2">
            <div v-for="(spec, index) in specs" :key="index" class="flex items-center gap-2">
              <input
                v-model="spec.label"
                placeholder="Ex: Poids"
                class="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <input
                v-model="spec.value"
                placeholder="Ex: 250 g"
                class="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="button"
                @click="removeSpec(index)"
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="form.inStock"
            type="checkbox"
            id="inStock"
            class="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
          <label for="inStock" class="text-sm font-medium text-gray-700">En stock</label>
        </div>

        <div class="flex gap-3 pt-2">
          <BaseButton variant="primary" :disabled="saving">
            {{ saving ? 'Sauvegarde...' : (isEdit ? 'Mettre a jour' : 'Creer') }}
          </BaseButton>
          <router-link :to="{ name: 'admin-dashboard' }">
            <BaseButton variant="ghost" type="button">
              Annuler
            </BaseButton>
          </router-link>
        </div>
      </form>
    </main>
  </div>
</template>
