import AdminPage from '@/views/admin/AdminPage.vue'
import PostAdminPage from '@/views/admin/PostAdminPage.vue'
import PostEditAdmin from '@/views/admin/PostEditAdmin.vue'
import PostWriteAdmin from '@/views/admin/PostWriteAdmin.vue'
import { component } from 'vue-code-highlight'

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
	},
	{
		path: '/admin/post/write',
		name: 'PostWriteAdmin',
		component: PostWriteAdmin,
		meta: { requiresAuth: true }
	},
	{
		path: '/admin/post/edit/:postId',
		name: 'PostEditAdmin',
		component: PostEditAdmin,
		meta: { requiresAuth: true }
	}
]

export default adminRoutes
