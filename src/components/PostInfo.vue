<script setup>
import apiClient from '@/config/apiClient';
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = route.params.id

const PostInfo = reactive({
	title: '',
	content: '',
})

onMounted(() => {
	let url = `/api/post/${postId}`
	apiClient
		.get(url)
		.then((response) => {
			PostInfo.title = response.data.title
			PostInfo.content = response.data.content
		})
		.catch((err) => {
			console.log('ERROR : ', err)
		})
})
</script>

<template>
	<div class="post">
		<h1>{{ PostInfo.title }}</h1>
		<p v-html="PostInfo.content"></p>
	</div>
</template>

<style scoped>
.post > h1 {
	margin-bottom: 8%;
	text-align: center;
}

.post > p {
	text-align: start;
}

.image {
	text-align: center;
}
</style>
