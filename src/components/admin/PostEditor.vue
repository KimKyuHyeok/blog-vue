<template>
    <div class="post-container">

    <div class="category-container">
        <div v-if="categories.length">
            <select v-model="selectedCategoryId" class="category-select">
                <option :value="null" disabled>카테고리를 선택하세요</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
                </option>
            </select>
        </div>
        <div v-else>카테고리를 선택하세요</div>
    </div>
    <div class="title-container">
        <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-input" />

    </div>
    <div ref="editorContainer" class="editor-container"></div>
    <button @click="submitPost" class="submit-button">게시글 작성</button>
    </div>
</template>

<script>
import { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import apiClient from '@/config/apiClient';

export default {
    data() {
        return {
            title: '',
            categories: [],
            selectedCategoryId: null,
            editor: null,
        };
    },
    mounted() {
            this.editor = new Editor({
            el: this.$refs.editorContainer,
            height: '600px',
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
        });
    this.fetchCategories();
  },
    beforeDestroy() {
        if (this.editor) {
            this.editor.destroy();
        }
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await apiClient.get('/category/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('카테고리 목록을 가져오는 데 실패했습니다:', error);
            }
        },
        async submitPost() {
            const content = this.editor.getHTML(); // 에디터에서 HTML 가져오기
            const data = {
                title: this.title,
                content: content,
                categoryId: this.selectedCategoryId, // 선택된 카테고리 ID
            };

            try {
                await apiClient.post('/board/create', data);
                alert('게시글이 작성되었습니다!');
                this.title = '';
                this.editor.setHTML('');
                this.selectedCategoryId = '';
            } catch (error) {
                console.error('게시글 작성 실패:', error);
                alert('게시글 작성에 실패했습니다.');
            }
        },
    },
};
</script>

<style scoped>
.post-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
.category-select {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}
.title-input {
    width: 95%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}
.editor-container {
    margin-bottom: 20px;
    height: 600px;
}

.submit-button {
    padding: 12px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
