<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const { login, isAuthenticated, loading } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

onMounted(() => {
  if (isAuthenticated.value) {
    router.replace({ name: 'admin-dashboard' })
  }
})

async function handleSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await login(email.value, password.value)
    router.replace({ name: 'admin-dashboard' })
  } catch (err) {
    error.value = 'Email ou mot de passe incorrect'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-aerisys-gray px-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="flex flex-col items-center mb-8">
        <img src="/logo/black.svg" alt="Aerisys" class="h-12 w-12 mb-3" />
        <span class="text-2xl font-bold font-display text-gray-900">AERISYS</span>
        <p class="text-sm text-gray-500 mt-1">Espace d'administration</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 class="text-xl font-bold font-display text-gray-900 mb-6 text-center">Connexion</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="admin@aerisys.fr"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div v-if="error" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {{ error }}
          </div>

          <BaseButton variant="primary" size="lg" class="w-full" :disabled="submitting">
            {{ submitting ? 'Connexion...' : 'Se connecter' }}
          </BaseButton>
        </form>
      </div>

      <!-- Back link -->
      <div class="text-center mt-6">
        <router-link to="/" class="text-sm text-gray-500 hover:text-primary-600 transition-colors">
          &larr; Retour au site
        </router-link>
      </div>
    </div>
  </div>
</template>
