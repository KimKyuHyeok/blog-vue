import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		extensions: ['.js', '.vue', '.json'], // 여기에 '.vue' 추가
	},
	server: {
		port: 80,
		proxy: {
		  '/api': {
			target: 'http://kyuhyeok.site:8080',
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, ''),
		  },
		},
	},
})
