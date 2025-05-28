<!-- AdminManager.vue -->
<template>
    <div class="window" style="width: 800px;">
      <div class="title-bar">
        <div class="title-bar-text">Admin Manager</div>
      </div>
      <div class="window-body">
        <div class="tabs">
          <button :class="{ active: activeTab === 'category' }" @click="activeTab = 'category'">
            📁 카테고리 관리
          </button>
          <button :class="{ active: activeTab === 'board' }" @click="activeTab = 'board'">
            📄 게시글 관리
          </button>
        </div>
  
        <div v-if="activeTab === 'category'" class="tab-content">
          <h3>카테고리 리스트</h3>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <input :value="category.name" @input="e => category.name = e.target.value" />
              <button @click="updateCategory(category)">수정</button>
              <button @click="deleteCategory(category.id)">삭제</button>
            </li>
          </ul>
  
          <h3>카테고리 추가</h3>
          <input v-model="newCategory" placeholder="새 카테고리명" />
          <button @click="createCategory">추가</button>
        </div>
  
        <div v-if="activeTab === 'board'" class="tab-content">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>게시글 리스트</h3>
            <button @click="goToBoardAdd">게시글 작성</button>
          </div>
          <ul>
            <li v-for="board in boards" :key="board.id">
              {{ board.title }}
              <button @click="editBoard(board.id)">수정</button>
              <button @click="confirmDelete(board.id)">삭제</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import apiClient from '@/config/apiClient'
  import { ref, onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  
  const activeTab = ref('category')
  const categories = ref([])
  const newCategory = ref('')
  
  const boards = ref([])
  const router = useRouter()
  
  onMounted(() => {
    fetchCategories()
    fetchBoards()
  })
  
  const fetchCategories = async () => {
    const { data } = await apiClient.get('/category/categories')
    categories.value = data.map((c) => reactive({ ...c }))
  }
  
  const createCategory = async () => {
    await apiClient.post('/category/create', { name: newCategory.value })
    newCategory.value = ''
    fetchCategories()
  }
  
  const updateCategory = async (category) => {
    await apiClient.post('/category/update', {
      id: category.id,
      name: category.name
    })
    fetchCategories()
  }
  
  const deleteCategory = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await apiClient.post('/category/delete', { id })
    fetchCategories()
  }
  
  const fetchBoards = async () => {
    const { data } = await apiClient.get('/board/all')
    console.log("board : ", data);
    boards.value = data
  }
  
  const goToBoardAdd = () => {
    router.push('/post/create')
  }
  
  const editBoard = (id) => {
    router.push(`/post/update/${id}`)
  }
  
  const confirmDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await apiClient.post('/board/delete', { id })
    fetchBoards()
  }
  </script>
  
  <style scoped>
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
  }
  
  .tabs button {
    padding: 8px 14px;
    font-size: 16px;
    background: #c0c0c0;
    border: 2px outset #fff;
    font-family: 'Pixelated MS Sans Serif', Arial;
    cursor: pointer;
  }
  
  .tabs button.active {
    background: #fff;
    border: 2px inset #c0c0c0;
  }
  
  .window {
    font-size: 16px;
    border: 2px solid black;
    background: #c0c0c0;
    box-shadow: 4px 4px 0px #000;
    padding: 10px;
  }
  
  .window-body {
    background: white;
    padding: 10px;
    border: 2px inset #fff;
  }

  .title-bar-text {
    font-family: 'Pixelated MS Sans Serif', Arial;
    font-size: 13px;
  }

  input {
    font-size: 16px;
    padding: 6px 10px;
    margin: 5px 0;
  }

  button {
    font-size: 16px;
    padding: 6px 12px;
    margin-left: 5px;
  }

  .window-body,
    .tabs button,
    input,
    button {
    font-family: system-ui, sans-serif;
    font-size: 16px;
    }
  </style>
  