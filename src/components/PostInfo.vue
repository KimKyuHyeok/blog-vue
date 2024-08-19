<script setup>
import "highlight.js/styles/github-dark-dimmed.css";
import apiClient from '@/config/apiClient';
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js';

const route = useRoute()
const postId = route.params.id
const categoryName = ref('')
const postList = ref([])

const PostInfo = reactive({
	title: '',
	content: '',
})

const applyHighlight = () => {
	nextTick(() => {
		const blocks = document.querySelectorAll('pre code, code[class^="language-"]')
		blocks.forEach((block) => {
			hljs.highlightElement(block);
		})
	})
}

onMounted(() => { 
	let url = `/api/post/${postId}`
	apiClient
		.get(url)
		.then((response) => {
			PostInfo.title = response.data.title
			PostInfo.content = response.data.content
			applyHighlight();
		})
		.catch((err) => {
			console.log('ERROR : ', err)
		});

	let listUrl = `/api/post/${postId}/category/posts`
	apiClient
		.get(listUrl)
		.then((response) => {
			categoryName.value = response.data.category.title
			postList.value = response.data.posts
		})
		.catch((err) => {
			console.log('ERROR : ', err)
		})
})
</script>

<template>
	<div class="post">
		<h3 class="title">{{ PostInfo.title }}</h3>
		<p v-html="PostInfo.content" class="content"></p>
	</div>
	<div class="list">
		<h4>{{ categoryName }} 카테고리의 다른 글</h4>
		<div v-for="post in postList">
			<a href="/posts/{{ post.id }}">{{ post.title }}</a>
		</div>
	</div>
</template>

<style scoped>

.list {
	margin-top: 100px;
	padding: 20px;
	width: 400px;
	border: 1px solid #E5E5E5;
}

.list > h4 {
	font-size: 12px;
	margin: 0;
	border-bottom: 1px solid #E5E5E5;
	padding: 2px 0 6px;
	color: #222;
	font-weight: bold;
	padding-bottom: 10px;
}

.list > div > a {
	color: #737373;
	font-weight: normal;
	text-decoration: none;
	border: none;
	text-align: left;
	font-size: 12px;
	line-height: 1.5;
}

.post, .content {
	margin-right: 150px;
	width: 1000px;
}

.title {
	border-bottom: 1px solid #efefef;
	padding-bottom: 30px;
    font-weight: normal;
    font-size: 34px;
    line-height: 43px;
    color: #222;
}

.content {
	padding-top: 30px;
	padding-bottom: 60px;
	text-align: start;
	border-bottom: 1px solid #efefef;
}
</style>
