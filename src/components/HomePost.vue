<script setup>
import { onMounted, reactive } from 'vue'
import apiClient from '../config/apiClient';

const PostInfo = reactive({
	title: '',
	content: '',
})

onMounted(() => {
	let url = '/api/post'
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

p {
	margin-bottom: 30px;
}

pre {
	margin: 30px 0;
}
</style>
