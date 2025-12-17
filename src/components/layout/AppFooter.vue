<script setup>
import { ref } from 'vue'

const email = ref('')

const footerLinks = {
  accueil: [
    { name: 'La home', href: '#' },
    { name: 'L\'équipe', href: '#equipe' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Timeline', href: '#' }
  ],
  boutique: [
    { name: 'Les Kits', href: '#' },
    { name: 'Composants', href: '#' },
    { name: 'Mes commandes', href: '#' },
    { name: 'Selection', href: '#' }
  ],
  wiki: [
    { name: 'Assemblage', href: '#' },
    { name: 'Calibration', href: '#' },
    { name: 'Dépannage', href: '#' }
  ]
}

const socialLinks = [
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'YouTube', icon: 'youtube', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'GitHub', icon: 'github', href: '#' }
]

const handleSubmit = () => {
  if (email.value) {
    console.log('Newsletter subscription:', email.value)
    email.value = ''
  }
}
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-12 md:py-16">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
        <!-- Logo & Description -->
        <div class="col-span-2 md:col-span-1">
          <a href="#" class="flex items-center gap-2 mb-4">
            <svg class="w-8 h-8 text-primary-400" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 4l8 4-8 4-8-4 8-4zm-10 7.5l10 5v9l-10-5v-9zm20 0v9l-10 5v-9l10-5z"/>
            </svg>
            <span class="text-xl font-bold font-display">AERISYS</span>
          </a>
        </div>

        <!-- Accueil -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Accueil</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.accueil" :key="link.name">
              <a :href="link.href" class="text-gray-300 hover:text-white transition-colors text-sm">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Boutique -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Boutique</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.boutique" :key="link.name">
              <a :href="link.href" class="text-gray-300 hover:text-white transition-colors text-sm">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Wiki -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Wiki</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.wiki" :key="link.name">
              <a :href="link.href" class="text-gray-300 hover:text-white transition-colors text-sm">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter & App -->
        <div class="col-span-2 md:col-span-1">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">App Mobile</h4>
          <div class="flex gap-2 mb-6">
            <a href="#" class="block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                class="h-10"
              />
            </a>
            <a href="#" class="block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                class="h-10"
              />
            </a>
          </div>

          <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Rejoignez-nous !</h4>
          <div class="flex gap-3">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
            >
              <svg v-if="social.icon === 'linkedin'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <svg v-if="social.icon === 'youtube'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <svg v-if="social.icon === 'instagram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <svg v-if="social.icon === 'github'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="flex-1 max-w-md">
              <div class="flex">
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="Votre e-mail"
                  class="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button 
                  @click="handleSubmit"
                  class="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-r-lg hover:bg-primary-700 transition-colors"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p class="text-sm text-gray-400">
          Copyright © 2024 • Tous droits réservés
        </p>
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <span>FR</span>
          <span>|</span>
          <a href="#" class="hover:text-white transition-colors">DESIGN ESPINOSAmusic</a>
        </div>
      </div>
    </div>
  </footer>
</template>
