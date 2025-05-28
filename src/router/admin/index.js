import AdminLoginPage from '@/views/admin/AdminLoginPage.vue'
import AdminMainPage from '@/views/admin/AdminMainPage.vue'
import AdminPostPage from '@/views/admin/AdminPostPage.vue'
import AdminPostUpdate from '@/views/admin/AdminPostUpdate.vue'

const adminRoutes = [
	{
		path: '/admin',
		name: 'AdminPage',
		component: AdminLoginPage,
	},
	{
		path: '/admin/home',
		name: 'AdminHome',
		component: AdminMainPage,
		meta: { requiresAuth: true },
	},
	{
		path: '/post/create',
		name: 'PostWrite',
		component: AdminPostPage,
		meta: { requiresAuth: true },
	},
	{
		path: '/post/update/:id',
		name: 'PostUpdate',
		component: AdminPostUpdate,
		meta: { requiresAuth: true }
	}
]

export default adminRoutes
