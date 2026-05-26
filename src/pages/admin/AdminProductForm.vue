<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { authFetch, token } = useAuth()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const uploadError = ref('')
const dragOver = ref(false)
const fileInput = ref(null)
const categories = ref([])

const form = ref({
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  price: '',
  images: [],
  category: '',
  tags: '',
  inStock: true
})

function centsToEuros(cents) {
  if (!cents && cents !== 0) return ''
  return (cents / 100).toFixed(2).replace('.', ',')
}

function eurosToCents(input) {
  if (input === '' || input === null || input === undefined) return 0
  const normalized = String(input).replace(',', '.').trim()
  const value = parseFloat(normalized)
  if (isNaN(value)) return 0
  return Math.round(value * 100)
}

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
        price: centsToEuros(product.price),
        images: Array.isArray(product.images) ? [...product.images] : [],
        category: product.category || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
        inStock: product.inStock ?? true
      }
      specs.value = (product.specs || []).map(s => ({ label: s.label || '', value: s.value || '' }))
    }
  } catch (err) {
    console.error('Erreur chargement produit:', err)
  } finally {
    loading.value = false
  }
}

async function uploadFiles(files) {
  uploadError.value = ''
  if (!files || files.length === 0) return

  uploading.value = true
  try {
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        uploadError.value = `${file.name} n'est pas une image`
        continue
      }
      const fd = new FormData()
      fd.append('image', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: fd
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        uploadError.value = data.error || `Echec upload ${file.name}`
        continue
      }
      const { url } = await res.json()
      form.value.images.push(url)
    }
  } finally {
    uploading.value = false
  }
}

function onFileChange(e) {
  uploadFiles(e.target.files)
  e.target.value = ''
}

function onDrop(e) {
  dragOver.value = false
  uploadFiles(e.dataTransfer.files)
}

function removeImage(index) {
  form.value.images.splice(index, 1)
}

function moveImage(index, dir) {
  const newIndex = index + dir
  if (newIndex < 0 || newIndex >= form.value.images.length) return
  const arr = form.value.images
  ;[arr[index], arr[newIndex]] = [arr[newIndex], arr[index]]
}

async function handleSubmit() {
  saving.value = true
  try {
    const body = {
      name: form.value.name,
      slug: form.value.slug || undefined,
      shortDescription: form.value.shortDescription,
      description: form.value.description,
      price: eurosToCents(form.value.price),
      images: form.value.images,
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

    <main class="container-custom py-8 max-w-3xl">
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

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Section: Informations generales -->
        <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="mb-5">
            <h2 class="text-base font-bold font-display text-gray-900">Informations generales</h2>
            <p class="text-xs text-gray-500 mt-0.5">Nom, description et categorisation du produit</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                v-model="form.name"
                required
                class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Slug
                <span class="text-gray-400 font-normal">(auto-genere si vide)</span>
              </label>
              <input
                v-model="form.slug"
                class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
              <input
                v-model="form.shortDescription"
                placeholder="Une phrase qui resume le produit"
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                  <span class="text-gray-400 font-normal">(separes par virgules)</span>
                </label>
                <input
                  v-model="form.tags"
                  placeholder="drone, debutant, fpv"
                  class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Section: Images -->
        <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="mb-5">
            <h2 class="text-base font-bold font-display text-gray-900">Images</h2>
            <p class="text-xs text-gray-500 mt-0.5">La premiere image sera utilisee comme image principale. Glissez pour reorganiser.</p>
          </div>

          <!-- Dropzone -->
          <div
            @click="fileInput.click()"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="onDrop"
            :class="[
              'relative border-2 border-dashed rounded-xl px-6 py-8 text-center cursor-pointer transition-colors',
              dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            ]"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="onFileChange"
            />
            <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm font-medium text-gray-700">
              <span v-if="uploading">Upload en cours...</span>
              <span v-else>Cliquez ou glissez vos images ici</span>
            </p>
            <p class="text-xs text-gray-500 mt-1">PNG, JPG, WebP &mdash; 5 MB max par image</p>
          </div>

          <div v-if="uploadError" class="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {{ uploadError }}
          </div>

          <!-- Preview grid -->
          <div v-if="form.images.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            <div
              v-for="(img, index) in form.images"
              :key="img + index"
              class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              <img :src="img" :alt="`Image ${index + 1}`" class="w-full h-full object-cover" />

              <span v-if="index === 0" class="absolute top-1.5 left-1.5 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary-600 text-white">
                Principale
              </span>

              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  @click="moveImage(index, -1)"
                  :disabled="index === 0"
                  class="p-1.5 bg-white rounded-md text-gray-700 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Deplacer a gauche"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="moveImage(index, 1)"
                  :disabled="index === form.images.length - 1"
                  class="p-1.5 bg-white rounded-md text-gray-700 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Deplacer a droite"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="p-1.5 bg-white rounded-md text-red-600 hover:bg-red-50"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: Prix & disponibilite -->
        <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="mb-5">
            <h2 class="text-base font-bold font-display text-gray-900">Prix &amp; disponibilite</h2>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <div class="relative">
                <input
                  v-model="form.price"
                  type="text"
                  inputmode="decimal"
                  placeholder="0,00"
                  required
                  pattern="[0-9]+([.,][0-9]{1,2})?"
                  class="w-full pl-3 pr-9 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">&euro;</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Saisir en euros, virgule ou point pour les centimes (ex&nbsp;: 19,90)</p>
            </div>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="form.inStock"
                type="checkbox"
                class="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span class="text-sm font-medium text-gray-700">En stock</span>
            </label>
          </div>
        </section>

        <!-- Section: Caracteristiques -->
        <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h2 class="text-base font-bold font-display text-gray-900">Caracteristiques</h2>
              <p class="text-xs text-gray-500 mt-0.5">Specifications techniques affichees sur la fiche produit</p>
            </div>
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
          <div v-else class="space-y-2">
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
        </section>

        <!-- Actions -->
        <div class="flex gap-3 sticky bottom-4 z-10">
          <BaseButton variant="primary" :disabled="saving || uploading">
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
