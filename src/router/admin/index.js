import AdminPage from '@/views/admin/AdminPage.vue'
import PostAdminPage from '@/views/admin/PostAdminPage.vue'

const adminRoutes = [
	{
		path: '/admin',
		name: 'AdminPage',
		component: AdminPage,
		meta: { requiresAuth: true },
	},
	{
		path: '/admin/post-list',
		name: 'PostAdminPage',
		component: PostAdminPage,
		meta: { requiresAuth: true }
	}
]

export default adminRoutes
