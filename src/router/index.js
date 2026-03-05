import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AppMobile from '@/pages/AppMobile.vue'

const DEFAULT_TITLE = 'Aerisys — Drone DIY Open Source | Kits, Composants & Tutoriels'
const DEFAULT_DESCRIPTION = 'Aerisys propose des kits et composants open-source pour construire votre propre drone DIY. Conçu pour les étudiants, makers et passionnés de robotique.'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: {
                title: DEFAULT_TITLE,
                description: DEFAULT_DESCRIPTION,
            },
        },
        {
            path: '/app',
            name: 'app-mobile',
            component: AppMobile,
            meta: {
                title: 'Application Mobile — Aerisys | Pilotez votre drone',
                description: 'L\'application mobile Aerisys vous permet de piloter, configurer et analyser votre drone DIY depuis votre smartphone. Disponible sur iOS et Android.',
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) {
            return {el: to.hash, behavior: 'smooth'}
        }
        return {top: 0}
    },
})

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE

    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) {
        descriptionTag.setAttribute('content', to.meta.description || DEFAULT_DESCRIPTION)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
        ogTitle.setAttribute('content', to.meta.title || DEFAULT_TITLE)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
        ogDescription.setAttribute('content', to.meta.description || DEFAULT_DESCRIPTION)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
        ogUrl.setAttribute('content', `https://aerisys.fr${to.path}`)
    }

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
        canonical.setAttribute('href', `https://aerisys.fr${to.path}`)
    }
})

export default router
