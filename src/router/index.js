import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AppMobile from '@/pages/AppMobile.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import CheckoutSuccessPage from '@/pages/CheckoutSuccessPage.vue'
import BoutiquePage from '@/pages/BoutiquePage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'
import MentionsLegalesPage from '@/pages/legal/MentionsLegalesPage.vue'
import PolitiqueConfidentialitePage from '@/pages/legal/PolitiqueConfidentialitePage.vue'
import CGVPage from '@/pages/legal/CGVPage.vue'

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
    { path: '/boutique', name: 'boutique', component: BoutiquePage },
    { path: '/boutique/admin', name: 'admin-login', component: () => import('@/pages/admin/AdminLogin.vue') },
    { path: '/boutique/admin/dashboard', name: 'admin-dashboard', component: () => import('@/pages/admin/AdminDashboard.vue'), meta: { requiresAuth: true } },
    { path: '/boutique/admin/products/new', name: 'admin-product-new', component: () => import('@/pages/admin/AdminProductForm.vue'), meta: { requiresAuth: true } },
    { path: '/boutique/admin/products/:id/edit', name: 'admin-product-edit', component: () => import('@/pages/admin/AdminProductForm.vue'), meta: { requiresAuth: true } },
    { path: '/boutique/admin/orders', name: 'admin-orders', component: () => import('@/pages/admin/AdminOrders.vue'), meta: { requiresAuth: true } },
    { path: '/boutique/:slug', name: 'product-detail', component: ProductDetailPage },
    { path: '/checkout', name: 'checkout', component: CheckoutPage },
    { path: '/checkout/success', name: 'checkout-success', component: CheckoutSuccessPage },
    { path: '/mentions-legales', name: 'mentions-legales', component: MentionsLegalesPage },
    { path: '/politique-confidentialite', name: 'politique-confidentialite', component: PolitiqueConfidentialitePage },
    { path: '/cgv', name: 'cgv', component: CGVPage },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
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
