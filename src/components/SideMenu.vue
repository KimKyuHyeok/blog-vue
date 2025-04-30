<template>
    <nav class="list">
        <ul>
        <li v-for="(category, index) in data" :key="category.id">
            <button @click="toggleCategory(index)">
            {{ category.name }}
            </button>
            <ul v-show="activeCategories.has(index)">
            <li v-for="board in category.boards" :key="board.id">
                <router-link :to="`/board/${board.id}`" class="board-title">
                {{ board.title }}
                </router-link>
            </li>
            </ul>
        </li>
        </ul>
    </nav>
  </template>

  
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const data = ref([]);
const activeCategories = ref(new Set());

const toggleCategory = (index) => {
    if (activeCategories.value.has(index)) {
        activeCategories.value.delete(index);
    } else {
        activeCategories.value.add(index);
    }
    activeCategories.value = new Set(activeCategories.value); // 강제 반응형 업데이트
};

onMounted(async () => {
    try {
        const response = await axios.get("https://api.devkyu96.site/board/all/title");
        data.value = response.data;

        // 모든 카테고리를 기본으로 열기
        activeCategories.value = new Set(data.value.map((_, index) => index));
    } catch (error) {
        console.log("API 요청 실패 : ", error);
    }
});
</script>
  
<style scoped>
.list {
    width: 300px;
    background: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    margin-left: 40px;
}

.list > ul > li {
    margin-bottom: 10px;
}

.list ul {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
}

.list ul li {
    margin-left: 20px;
}

button {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    color: #333;
}

.board-title {
  display: inline-block;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
  text-decoration: none;
  font-size: 0.95rem;
}

.board-title:hover {
  text-decoration: underline;
}
</style>
  