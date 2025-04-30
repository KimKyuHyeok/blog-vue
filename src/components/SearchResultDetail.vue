<template>
    <div>
        <h2>"{{ route.query.keyword }}" 검색결과</h2>

        <div v-if="paginatedBoards.length">
            <div
                v-for="board in paginatedBoards"
                :key="board.id"
                class="search-result"
            >
                <h3 class="search-title" v-html="highlightKeyword(board.title)" @click="goToDetail(board.id)"></h3>
                <p
                    v-for="(line, idx) in getFilteredLines(board.content)"
                    :key="idx"
                    class="search-snippet"
                    v-html="highlightKeyword(line)"
                    @click="goToDetail(board.id)"
                ></p>
            </div>
        </div>
        <p v-else>검색 결과가 없습니다.</p>

        <div class="pagination" v-if="totalPages > 1">
            <button @click="currentPage--" :disabled="currentPage === 1">이전</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="currentPage++" :disabled="currentPage === totalPages">다음</button>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const allBoards = ref([]);
const currentPage = ref(1);
const pageSize = 5;

const fetchSearchResults = async () => {
    const keyword = route.query.keyword;
    if (!keyword) return;

    try {
        const response = await axios.get('https://api.devkyu96.site/board/search', {
            params: { keyword },
        });
        allBoards.value = response.data;
        currentPage.value = 1;
    } catch (error) {
        console.error('검색 실패 : ', error);
    }
};

onMounted(fetchSearchResults);
watch(() => route.query.keyword, fetchSearchResults);

const totalPages = computed(() => Math.ceil(allBoards.value.length / pageSize));
const paginatedBoards = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return allBoards.value.slice(start, start + pageSize);
});

const goToDetail = (id) => {
    router.push(`/board/${id}`);
};

const keyword = computed(() => route.query.keyword?.toString() || '');

const highlightKeyword = (text) => {
    if (!keyword.value) return text;
    const escapedKeyword = keyword.value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
};

const getFilteredLines = (text) => {
    if (!text || !keyword.value) return [];

    const plainText = text.replace(/<[^>]+>/g, '');
    return plainText
        .split('\n')
        .filter(line => line.includes(keyword.value));
};
</script>

<style scoped>
.search-result {
    padding: 12px 16px;
    margin-bottom: 20px;
    cursor: pointer;
    border-bottom: 1px solid #e4e4e4;
    transition: background-color 0.2s ease;
}

.search-result:hover {
    background-color: #f9f9f9;
}

.search-title {
    color: #1a0dab;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0 0 6px 0;
    text-decoration: none;
}

.search-title:hover {
    text-decoration: underline;
}

.search-snippet {
  font-size: 0.95rem;
  color: #4d4d4d;
  margin: 0 0 4px 0;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}


:deep(strong) {
    color: black;
    font-weight: bold;
}

.pagination {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
}
</style>
