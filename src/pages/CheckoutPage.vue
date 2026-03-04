<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PaymentForm from '@/components/ui/PaymentForm.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCart } from '@/composables/useCart'

const { items, cartTotal, isEmpty, removeFromCart, updateQuantity } = useCart()

const cguAccepted = ref(false)
const productCurrency = 'eur'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const address = ref('')
const postalCode = ref('')
const city = ref('')

const formComplete = computed(() =>
  firstName.value.trim() !== '' &&
  lastName.value.trim() !== '' &&
  email.value.trim() !== '' &&
  address.value.trim() !== '' &&
  postalCode.value.trim() !== '' &&
  city.value.trim() !== ''
)

const canPay = computed(() => !isEmpty.value && cguAccepted.value && formComplete.value)

const customerName = computed(() => `${firstName.value.trim()} ${lastName.value.trim()}`)
</script>

<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom">
      <!-- Empty cart -->
      <div v-if="isEmpty" class="max-w-md mx-auto text-center py-20">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h1 class="text-2xl font-display font-bold text-gray-900 mb-2">Votre panier est vide</h1>
        <p class="text-gray-500 mb-6">Ajoutez des produits depuis notre boutique pour commencer.</p>
        <RouterLink to="/boutique">
          <BaseButton variant="primary" size="md">
            Voir la boutique
          </BaseButton>
        </RouterLink>
      </div>

      <!-- Checkout flow -->
      <template v-else>
        <div class="max-w-2xl mx-auto">
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-2 text-center">
            Finalisez votre <span class="text-primary-600">commande</span>
          </h1>
          <p class="text-gray-500 text-center mb-10">Vérifiez votre panier puis procédez au paiement sécurisé.</p>

          <!-- Section 1 — Cart recap -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Récapitulatif</h3>

            <ul class="divide-y divide-gray-100">
              <li
                v-for="item in items"
                :key="item.slug"
                class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <!-- Thumbnail -->
                <RouterLink :to="`/boutique/${item.slug}`" class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 block">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </RouterLink>

                <!-- Name + unit price -->
                <div class="flex-1 min-w-0">
                  <RouterLink :to="`/boutique/${item.slug}`" class="text-sm font-semibold text-gray-900 truncate block hover:text-primary-600 transition-colors">{{ item.name }}</RouterLink>
                  <p class="text-xs text-gray-500">{{ (item.price / 100).toFixed(2) }} &euro; / unité</p>
                </div>

                <!-- Quantity -->
                <div class="flex items-center gap-2">
                  <button
                    @click="updateQuantity(item.slug, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    &minus;
                  </button>
                  <span class="text-sm font-medium text-gray-900 w-6 text-center">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.slug, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                <!-- Line total -->
                <span class="text-sm font-semibold text-gray-900 w-20 text-right">
                  {{ ((item.price * item.quantity) / 100).toFixed(2) }} &euro;
                </span>

                <!-- Remove -->
                <button
                  @click="removeFromCart(item.slug)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            </ul>

            <!-- Totals -->
            <div class="pt-4 mt-4 border-t border-gray-100 space-y-2">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span>{{ (cartTotal / 100).toFixed(2) }} &euro;</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span class="text-primary-600 font-medium">Gratuite</span>
              </div>
              <div class="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>{{ (cartTotal / 100).toFixed(2) }} &euro;</span>
              </div>
            </div>
          </div>

          <!-- Section 2 — Customer info -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Vos informations</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  required
                  autocomplete="given-name"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  required
                  autocomplete="family-name"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  placeholder="Dupont"
                />
              </div>
            </div>
            <div class="mt-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                placeholder="jean.dupont@email.com"
              />
            </div>
            <div class="mt-4">
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                id="address"
                v-model="address"
                type="text"
                required
                autocomplete="street-address"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                placeholder="12 rue de la Paix"
              />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                <input
                  id="postalCode"
                  v-model="postalCode"
                  type="text"
                  required
                  autocomplete="postal-code"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  placeholder="75001"
                />
              </div>
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  id="city"
                  v-model="city"
                  type="text"
                  required
                  autocomplete="address-level2"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  placeholder="Paris"
                />
              </div>
            </div>
          </div>

          <!-- Section 3 — RGPD consent -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Conditions générales</h3>
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="cguAccepted"
                type="checkbox"
                class="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="text-sm text-gray-600">
                J'accepte les
                <RouterLink to="/cgv" target="_blank" class="text-primary-600 font-medium hover:underline">conditions générales de vente</RouterLink>
                et la
                <RouterLink to="/politique-confidentialite" target="_blank" class="text-primary-600 font-medium hover:underline">politique de confidentialité</RouterLink>.
                Mes données personnelles seront traitées conformément au RGPD pour le traitement de cette commande.
              </span>
            </label>
          </div>

          <!-- Section 4 — Payment -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Paiement sécurisé</h3>

            <div v-if="!canPay" class="text-center py-8 text-gray-400">
              <svg class="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p class="text-sm">Remplissez vos informations et acceptez les conditions générales pour accéder au paiement.</p>
            </div>

            <PaymentForm
              v-else
              :amount="cartTotal"
              :currency="productCurrency"
              :customer-name="customerName"
              :customer-email="email.trim()"
            />
          </div>
        </div>
      </template>
    </div>
  </main>
</template>
