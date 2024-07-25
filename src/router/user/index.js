import Home from '@/views/Home.vue'
import PostDetail from '@/views/PostDetail.vue'
import PasswordConfirm from '@/views/admin/PasswordConfirm.vue'

const userRoutes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/password',
		name: 'PasswordConfirm',
		component: PasswordConfirm,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetail,
	},
]

export default userRoutes
