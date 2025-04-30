<template>
    <div class="post-container">
      <div class="category-container">
        <!-- 카테고리 선택 -->
        <div v-if="!categories.length">카테고리를 선택하세요</div>
        <select v-if="categories.length" v-model="selectedCategoryId" class="category-select">
          <option value="" disabled>카테고리를 선택하세요</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
  
      <!-- 제목 입력 -->
      <div class="title-container">
        <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-input" />
      </div>
  
      <!-- 에디터 -->
      <div ref="editorContainer" class="editor-container"></div>
  
      <!-- 글쓰기 버튼 -->
      <button @click="submitPost" class="submit-button">게시글 수정</button>
    </div>
  </template>
  
  <script>
  import { Editor } from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import '@toast-ui/editor/dist/toastui-editor-viewer.css';
  import apiClient from '@/config/apiClient';
  import { nextTick, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  let editor;

  export default {
    data() {
      return {
        title: '', // 제목
        categories: [], // 카테고리 목록
        selectedCategoryId: '', // 선택된 카테고리 ID, 빈 값으로 시작
      };
    },
    async mounted() {
      // DOM이 완전히 렌더링된 후에 에디터를 초기화
      await nextTick();
  
      // 에디터 초기화
      this.editor = await new Editor({
        el: this.$refs.editorContainer,
        height: '600px', // 에디터 크기 조정
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
      });
  
      // 게시글 정보 가져오기 후, setHTML 적용
      const content = await this.getBoardInfo();
  
      // 카테고리 목록 가져오기
      await this.fetchCategories();
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
  
      // 게시글 정보 가져오기
      async getBoardInfo() {
        try {
          const boardId = this.$route.params.id; // URL에서 boardId 가져오기
          const boardResponse = await apiClient.get('/board/id', {
            params: { id: boardId },
          });
  
          // 가져온 데이터를 기반으로 상태 업데이트
          this.title = boardResponse.data.title;
          this.selectedCategoryId = boardResponse.data.categoryId;
          this.editor.setHTML(boardResponse.data.content);
        } catch (error) {
          console.error('게시글 정보를 불러오는데 실패했습니다:', error);
          alert('게시글 정보를 불러오는 데 실패했습니다.');
        }
      },
  
      // 게시글 수정
      async submitPost() {
        const router = useRouter();
        const boardId = this.$route.params.id;
  
        // 에디터가 초기화되지 않았으면 종료
        if (!this.editor) {
          console.error('Editor가 초기화되지 않았습니다.');
          return;
        }
  
        const content = this.editor.getHTML(); // 에디터에서 HTML 가져오기
        const data = {
            id: boardId,
            title: this.title,
            content: content,
        };
  
        try {
          // 서버로 POST 요청
          await apiClient.post('/board/update', data);
          this.title = '';
          this.editor.setHTML('');
          this.selectedCategoryId = ''; // 카테고리 초기화
          alert('수정이 완료되었습니다.');
          this.$router.push('/admin/home');
        } catch (error) {
          console.error('게시글 수정 실패:', error);
          alert('게시글 수정에 실패했습니다.');
        }
      },
    },
  };
  </script>

  

<style scoped>
/* 게시글 작성 컨테이너 */
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 카테고리 select */
.category-select {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

/* 제목 입력 input */
.title-input {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

/* 에디터 */
.editor-container {
  margin-bottom: 20px;
  height: 600px; /* 에디터 크기 조정 */
}

/* 글쓰기 버튼 */
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
