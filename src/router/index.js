import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AppMobile from '@/pages/AppMobile.vue'

const DEFAULT_TITLE = 'Aerisys — Drone DIY Open Source | Kits, Composants & Tutoriels'
const DEFAULT_DESCRIPTION = 'Aerisys : kit drone DIY open source à construire soi-même. Châssis impression 3D, ESP32, application mobile. Idéal pour étudiants, makers et passionnés de robotique et aéronautique.'

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
                title: 'Application Mobile Drone DIY — Aerisys | Pilotez votre drone depuis votre smartphone',
                description: 'L\'application mobile Aerisys : pilotez, configurez et analysez votre drone DIY open source depuis votre smartphone. Interface intuitive disponible sur iOS et Android.',
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
