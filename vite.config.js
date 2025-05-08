import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
	base: './src',
	plugins: [
		vue(),
		createHtmlPlugin({
			inject: {
				data: {
					title: '[개발 기록] - Blog'
				}
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@ckeditor': path.resolve(__dirname, 'node_modules/@ckeditor'),
		},
		extensions: ['.js', '.vue', '.json'], // 여기에 '.vue' 추가
	},
	server: {
		host: '0.0.0.0',
		port: 80,
		fs: {
			exclude: ['.git']
		},
		hmr: {
			overlay: false
		},
	},
})
