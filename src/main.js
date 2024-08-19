import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'

//ckeditor
import './style.css'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

// bootstrap-vue-next
import { createBootstrap } from 'bootstrap-vue-next'
import axios from 'axios'

import hljs from 'highlight.js'



const app = createApp(App)
app.use(CkeditorPlugin).mount('#editor')
app.use(hljs)
const bootstrapVue = createBootstrap(app)
app.use(router)
app.use(bootstrapVue)

axios.defaults.withCredentials = true

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

app.mount('#app')
