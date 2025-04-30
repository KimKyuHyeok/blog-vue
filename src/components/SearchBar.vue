<template>
    <div class="search-bar">
        <input type="text" name="keyword" v-model="keyword" @keydown.enter="goToSearchPage" placeholder="검색어를 입력하세요">
        <button class="search-btn" @click="goToSearchPage">
            🔍
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter()
const keyword = ref('')

const goToSearchPage = () => {
    if (!keyword.value.trim()) return
    router.push({ path: '/board/search', query: { keyword: keyword.value } })
}

</script>

<style scoped>

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    width: 100%;
}

.search-bar input {
    font-size: 1rem;
    margin-right: 10px;
    border-radius: 12px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}

.search-bar .search-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}

</style>