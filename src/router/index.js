import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from '@/router/admin/index'
import Home from '@/views/Home.vue'
import SearchPage from '@/views/SearchPage.vue'
import apiClient from '@/config/apiClient'

const routes = [
    ...adminRoutes,
    {
        path: '/board/search',
        component: SearchPage
    },
    {
        path: '/board/:id',
        name: 'BoardDetail',
        component: Home
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.path.startsWith('/admin')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/xp.css/dist/98.css'
        document.head.appendChild(link)
    } else {
        const link = document.querySelector('link[href="https://cdn.jsdelivr.net/npm/xp.css/dist/98.css"]')
        if (link) link.remove()
    }

    if (to.matched.some(route => route.meta.requiresAuth)) {
        const tokenIsValid = await isValidToken()

        if (tokenIsValid) {
            next()
        } else {
            next('/admin')
        }
    } else {
        next()
    }
})

async function isValidToken() {
    const token = localStorage.getItem('admin_token')
    if (!token) {
        return false
    }

    try {
        const response = await apiClient.post('/auth/token', { token })
        return response.data.isValid
    } catch (error) {
        console.error('Token validation failed', error)
        return false
    }
}

export default router
