<script setup>
import {ref} from 'vue'

const email = ref('')

const footerLinks = {
    accueil: [
        {name: 'Le projet', href: '/'},
        {name: 'L\'équipe', href: '/#equipe'},
        {name: 'FAQ', href: '/#faq'},
        {name: 'Application mobile', href: 'app'}
    ],
    boutique: [
        {name: 'Les Kits', href: '#'},
        {name: 'Composants', href: '#'},
        {name: 'Mes commandes', href: '#'},
        {name: 'Selection', href: '#'}
    ],
    wiki: [
        {name: 'Assemblage', href: '#'},
        {name: 'Calibration', href: '#'},
        {name: 'Dépannage', href: '#'}
    ]
}

const currentYear = new Date().getFullYear()

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
                    <RouterLink to="/"
                                class="flex items-center gap-2 mb-4"
                                aria-label="Aerisys - Accueil">
                        <img src="/logo/white.svg"
                             alt="Logo Aerisys"
                             class="h-10 w-10 ml-0"/>
                        <span class="text-xl font-bold font-display transition-colors text-white">
                            AERISYS
                        </span>
                    </RouterLink>
                </div>

                <!-- Accueil -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Accueil</h4>
                    <ul class="space-y-2">
                        <li v-for="link in footerLinks.accueil"
                            :key="link.name">
                            <a :href="link.href"
                               class="text-gray-300 hover:text-white transition-colors text-sm">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Boutique -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Boutique</h4>
                    <ul class="space-y-2">
                        <li v-for="link in footerLinks.boutique"
                            :key="link.name">
                            <a :href="link.href"
                               class="text-gray-300 hover:text-white transition-colors text-sm">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Wiki -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Wiki</h4>
                    <ul class="space-y-2">
                        <li v-for="link in footerLinks.wiki"
                            :key="link.name">
                            <a :href="link.href"
                               class="text-gray-300 hover:text-white transition-colors text-sm">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter & App -->
                <div class="col-span-2 md:col-span-1">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">App Mobile</h4>
                    <div class="flex gap-2 mb-6">
                        <a href="#"
                           class="block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                 alt="App Store"
                                 class="h-10"/>
                        </a>
                        <a href="#"
                           class="block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                 alt="Google Play"
                                 class="h-10"/>
                        </a>
                    </div>

                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Rejoignez-nous !</h4>
                    <div class="flex gap-3">
                        <a key="linkedin"
                           href="https://www.linkedin.com/company/aerisys/"
                           aria-label="LinkedIn"
                           class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Newsletter -->
<!--            <div class="mt-12 pt-8 border-t border-gray-800">-->
<!--                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">-->
<!--                    <div class="flex items-center gap-4">-->
<!--                        <div class="flex-1 max-w-md">-->
<!--                            <div class="flex">-->
<!--                                <input v-model="email"-->
<!--                                       type="email"-->
<!--                                       placeholder="Votre e-mail"-->
<!--                                       class="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-l-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"/>-->
<!--                                <button @click="handleSubmit"-->
<!--                                        class="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-r-2xl hover:bg-primary-700 transition-colors">-->
<!--                                    S'inscrire-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <!-- Bottom -->
            <div class="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p class="text-sm text-gray-400">
                    Copyright © {{ currentYear }} • Tous droits réservés
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>FR</span>
                    <span>|</span>
                    <span>Design by Aerisys</span>
                </div>
            </div>
        </div>
    </footer>
</template>
