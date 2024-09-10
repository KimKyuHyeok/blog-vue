<template>
	<div class="category">
	  <select id="category" v-model="selectedCategory" class="form-select">
		<option value="" disabled>카테고리 선택</option>
		<option v-for="category in categories" :key="category.id" :value="category.id">
		  {{ category.title }}
		</option>
	  </select>
	</div>
	<div class="titleInput">
	  <input type="text" class="form-control" placeholder="제목을 입력해주세요" v-model="title" />
	</div>
	<div>
	  <div class="main-container">
		<div class="editor-container editor-container_classic-editor" ref="editorContainerElement">
		  <div class="editor-container__editor">
			<div ref="editorElement">
			  <ckeditor v-if="isLayoutReady" v-model="content" :editor="editor" :config="config" />
			</div>
		  </div>
		</div>
	  </div>
	</div>
	<button class="btn btn-primary" @click="submitPost">수정하기</button>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import {
		ClassicEditor,
		AccessibilityHelp,
		Autoformat,
		AutoLink,
		Autosave,
		Bold,
		Code,
		CodeBlock,
		Essentials,
		GeneralHtmlSupport,
		Heading,
		HtmlEmbed,
		Italic,
		Link,
		Paragraph,
		SelectAll,
		ShowBlocks,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		Undo
	} from 'ckeditor5';
	import apiClient from '@/config/apiClient';
	import { useRouter, useRoute } from 'vue-router';

	import 'ckeditor5/ckeditor5.css';

	const editor = ClassicEditor;
	const config = ref(null);
	const isLayoutReady = ref(false);
	const selectedCategory = ref([]);
	const title = ref('');
	const categories = ref([]);
	const content = ref('');
	const router = useRouter();
	const route = useRoute();
	const token = localStorage.getItem('token');
	const postId = route.params.postId;


	const fetchCategories = async () => {
		try {
			const response = await apiClient.get('/api/admin/list/category', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			categories.value = response.data;
		} catch (err) {
			console.error('Error fetch categories : ', err);
		}
	};

	const fetchPostData = async () => {
		try {
			const response = await apiClient.get(`/api/post/${postId}`);

			title.value = response.data.title;
			content.value = response.data.content;
			selectedCategory.value = response.data.subId;


		} catch (err) {
			console.error('Error fetch post data : ', err);
		}
	};

	const setupConfig = () => {
		config.value = {
			toolbar: {
				items: [
					'undo',
					'redo',
					'|',
					'showBlocks',
					'selectAll',
					'|',
					'heading',
					'|',
					'bold',
					'italic',
					'code',
					'|',
					'link',
					'insertTable',
					'codeBlock',
					'htmlEmbed',
					'|',
					'accessibilityHelp'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AccessibilityHelp,
				Autoformat,
				AutoLink,
				Autosave,
				Bold,
				Code,
				CodeBlock,
				Essentials,
				GeneralHtmlSupport,
				Heading,
				HtmlEmbed,
				Italic,
				Link,
				Paragraph,
				SelectAll,
				ShowBlocks,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TextTransformation,
				Undo
			],
			heading: {
				options: [
					{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
					{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
					{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
					{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
					{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
					{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
					{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
				]
			},
			htmlSupport: {
				allow: [
					{ name: /^.*$/, styles: true, attributes: true, classes: true }
				]
			},
			initialData: '',
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: { download: 'file' }
					}
				}
			},
			menuBar: { isVisible: true },
			placeholder: 'Type or paste your content here!',
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			}
		};
	};

	onMounted(async () => {
        if (postId) {
			await fetchPostData();
		}
		setupConfig();
		isLayoutReady.value = true;
		await fetchCategories();
	});

	const submitPost = async () => {
		if (!selectedCategory.value) {
			alert('카테고리를 선택해주세요.');
			return;
		}
		if (!title.value) {
			alert('제목을 입력해주세요.');
			return;
		}

		try {
			const response = await apiClient.put(`/api/admin/update/${postId}`, {
				title: title.value,
				content: content.value,
				categoryId: selectedCategory.value
			}, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (response.status === 200) {
				alert('게시글 수정 완료');
				router.push(`/posts/${postId}`);
			}
		} catch (err) {
			console.error('Error submit post : ', err);
		}
	};
</script>
