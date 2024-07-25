import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from '@/router/admin/index'
import userRoutes from '@/router/user/index'
import apiClient from '@/config/apiClient'

const routes = [...adminRoutes, ...userRoutes]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                next({path: '/password'});
            } else {
                await apiClient.get('/api/admin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                next();
            }
        } catch (error) {
            localStorage.removeItem('token');
            next({path: '/password'});
        }
    } else {
        next();
    }
});

export default router
