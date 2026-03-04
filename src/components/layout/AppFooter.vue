<script setup>
import {ref} from 'vue';
import {RouterLink} from 'vue-router';

const email = ref('');

const footerLinks = {
    accueil: [
        {
            name: 'La home',
            href: '#'
        },
        {
            name: 'L\'équipe',
            href: '#equipe'
        },
        {
            name: 'FAQ',
            href: '#faq'
        },
        {
            name: 'Timeline',
            href: '#'
        }
    ],
    boutique: [
        {
            name: 'Les Kits',
            href: '/boutique?category=drones'
        },
        {
            name: 'Composants',
            href: '/boutique?category=composants'
        },
        {
            name: 'Mes commandes',
            href: '/checkout'
        },
        {
            name: 'Selection',
            href: '/boutique'
        }
    ],
    wiki: [
        {name: 'Assemblage', href: 'https://wiki.aerisys.fr/'},
        {name: 'Calibration', href: 'https://wiki.aerisys.fr/'},
        {name: 'Dépannage', href: 'https://wiki.aerisys.fr/'}
    ],
    legal: [
        {
            name: 'Mentions légales',
            href: '/mentions-legales'
        },
        {
            name: 'CGV',
            href: '/cgv'
        },
        {
            name: 'Confidentialité',
            href: '/politique-confidentialite'
        }
    ]
};

const currentYear = new Date().getFullYear()

const handleSubmit = () => {
    if (email.value) {
        console.log('Newsletter subscription:', email.value);
        email.value = '';
    }
};
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
                               target="_blank"
                               rel="noopener noreferrer"
                               class="text-gray-300 hover:text-white transition-colors text-sm">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Légal -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Légal</h4>
                    <ul class="space-y-2">
                        <li v-for="link in footerLinks.legal" :key="link.name">
                            <RouterLink :to="link.href" class="text-gray-300 hover:text-white transition-colors text-sm">
                                {{ link.name }}
                            </RouterLink>
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
                        <a key="discord"
                           href="https://discordapp.com/invite/HSuGVYUDur"
                           aria-label="Discord"
                           class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
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
                    Copyright © {{ currentYear }} Aerisys • Tous droits réservés
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
